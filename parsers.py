from bs4 import BeautifulSoup

import sources


def howlongtobeat(data):
    """
    This parser restructures the How Long To Beat user games
    query to strip out any unneeded HTML elements
    :param data: An HTML snippet.
    :return: A dictionary object.
    """
    soup = BeautifulSoup(data, 'html.parser')
    title_soup = soup.find_all("a", {"class": "text_green"})
    platform_soup = soup.find_all("span", {"class": "text_grey"})
    titles = [title.get_text().strip() for title in title_soup]
    platforms = [platform.get_text().strip() for platform in platform_soup]
    games = list()
    for i in range(len(titles)):
        info = sources.game_data(titles[i])
        platform = platforms[i]
        image = info['img']

        if len(info) == 1:
            name = titles[i]
            link = '#'
            year = '0000'
        else:
            name = info['name']
            link = info['link']
            year = info['year']
        games.append({
            'name': name,
            'link': link,
            'year': year,
            'platform': platform,
            'image': image
        })
    return games


def lastfm(data):
    """
    This parser restructures the LastFM API response to
    both eliminate unneeded data and to be more human parsable.
    For more obscure tracks, an album cover may not be available
    so we just provide our own placeholder from the static folder.
    :param data: A serialised JSON string.
    :return: A dictionary object.
    """
    songs = list()
    tracks = data['recenttracks']['track']
    for item in tracks:
        song = {
            'name': item['name'],
            'image': '/img/no_cover.png',
            'link': item['url'],
            'artist': item['artist']['#text']
        }
        if item['image'][3]['#text']:
            song['image'] = item['image'][3]['#text']
        songs.append(song)
    return songs


def trakt_movies(data):
    """
    This parser restructures the response from the
    Movies endpoint (of the Trakt API) to both
    eliminate unneeded data and to be more human parsable.
    As covers aren't provided in the Trakt response, we
    request them manually from TheMovieDB's API.
    :param data: A serialised JSON string.
    :return: A dictionary object.
    """
    movies = list()
    for item in data:
        tmdb = item['movie']['ids']['tmdb']
        imdb = item['movie']['ids']['imdb']

        name = item['movie']['title']
        image = sources.film_covers(tmdb)
        link = 'http://www.imdb.com/title/{}/'.format(imdb)
        year = item['movie']['year']

        movies.append({
            'name': name,
            'image': image,
            'link': link,
            'year': year
        })
    return movies


def trakt_shows(data):
    """
    This parser restructures the response from the
    TV endpoint (of the Trakt API) to both
    eliminate unneeded data and to be more human parsable.
    As show screenshots aren't provided in the Trakt response, we
    request them manually from TheTVDB's API.
    I would request them from TMDB too but TVDB is often more
    up to date despite usually be a more painful dev experience.
    :param data: A serialised JSON string.
    :return: A dictionary object.
    """
    shows = list()
    for item in data:
        slug = item['show']['ids']['slug']
        season = item['episode']['season']
        number = item['episode']['number']

        name = item['episode']['title']
        series = item['show']['title']
        image = sources.show_covers(season, number, series)
        link = ('https://trakt.tv/shows/{}/seasons/{}/'
                'episodes/{}'.format(slug, season, number))

        shows.append({
            'name': name,
            'series': series,
            'image': image,
            'link': link
        })
    return shows