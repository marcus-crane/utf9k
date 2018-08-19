import json

import parsers
from settings import Settings

import requests
import redis

rc = redis.StrictRedis(host='redis', port=6379, db=0, decode_responses=True)


def query_service(url, headers=dict(), payload=dict()):
    """
    A generalised function that handles making requests and
    injecting a user agent header.
    No assumption is made about the Content-Type being returned.
    You'll need to perform any required parsing in the sources/parser
    function (eg json.loads or xml.etree.ElementTree)
    :param url: A string containing the URL to be requested.
    :param headers: A dictionary containing any other required headers.
    :param payload: A dictionary containing data to send
    :return: A string or dictionary.
    """
    headers['User-Agent'] = 'utf9k <https://utf9k.net>'
    if bool(payload):
        r = requests.post(url, headers=headers, data=payload)
    else:
        r = requests.get(url, headers=headers)
    if 'json' in headers['Content-Type']:
        return r.json()
    return r.text


def film_covers(tmdb):
    """
    This function fetches film posters, sometimes called covers,
    from TheMovieDB.
    In the event that a cover can't be found, a local placeholder
    will be used instead.
    I've never actually had it trigger though
    since film posters are seemingly always available.
    :param tmdb: A string containing an ID for TheMovieDB entry.
    :return: A string containing a URL to an image.
    """
    url = ('https://api.themoviedb.org/3/movie/{}/images'
           '?api_key={}'.format(tmdb, Settings.TMDB))
    headers = {'Content-Type': 'application/json'}
    try:
        data = query_service(url, headers)
        poster = data['posters'][0]['file_path']
        img = 'https://image.tmdb.org/t/p/w500{}'.format(poster)
    except Exception:
        img = ' /img/no_cover.png'

    return img


def game_data(title):
    """
    This function fetches game cover art and other data from Giant Bomb.
    It assumes that the first result which has the resource_type of game
    is going to be the correct entry.
    :param title: A string containing the name of a videogame.
    :return A dictionary containing a game name, image, id and release year
    """
    url = ('https://www.giantbomb.com/api/search?query={0}'
           '&api_key={1}&format=json'.format(title, Settings.GIANTBOMB))
    headers = {'Content-Type': 'application/json'}
    game = {}
    try:
        data = query_service(url, headers)
        entries = data['results']
        entry = list(filter(
            lambda x: x['resource_type'] == 'game', entries))[0]
        game['img'] = entry['image']['medium_url']
        game['link'] = entry['site_detail_url']
        game['name'] = entry['name']
        game['year'] = int(entry['original_release_date'][0:4])
    except Exception:
        game['img'] = '/img/no_cover.png'

    return game


def fetch_games():
    """
    Calling this kicks off everything required to store recently
    played games in the database.
    :return: N/A
    """
    rc.delete('games')
    payload = {'n': Settings.HLTB, 'playing': '1'}
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    url = 'https://howlongtobeat.com/user_games_list.php'
    data = query_service(url, headers=headers, payload=payload)
    vg_data = parsers.howlongtobeat(data)
    rc.execute_command('JSON.SET', 'games', '.', json.dumps(vg_data))


def fetch_movies():
    """
    Calling this kicks off everything required to store recently
    watched movies in the database.
    :return: N/A
    """
    rc.delete('movies')
    url = 'https://api.trakt.tv/users/sentry/history/movies'
    headers = {'Content-Type': 'application/json',
               'trakt-api-version': '2',
               'trakt-api-key': Settings.TRAKT}
    data = query_service(url, headers)
    movie_data = parsers.trakt_movies(data)
    rc.execute_command('JSON.SET', 'movies', '.', json.dumps(movie_data))


def fetch_music():
    """
    Calling this kicks off everything required to store recently
    listened music in the database.
    :return: N/A
    """
    rc.delete('music')
    url = ('http://ws.audioscrobbler.com/2.0/?'
           'method=user.getrecenttracks'
           '&user=sentryism&api_key={}'
           '&format=json&limit=10'.format(Settings.LASTFM))
    headers = {'Content-Type': 'application/json'}
    data = query_service(url, headers)
    music_data = parsers.lastfm(data)
    rc.execute_command('JSON.SET', 'music', '.', json.dumps(music_data))
