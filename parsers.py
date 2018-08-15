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
            'image': '/static/img/no_cover.png',
            'link': item['url'],
            'artist': item['artist']['#text']
        }
        if item['image'][3]['#text']:
            song['image'] = item['image'][3]['#text']
        songs.append(song)
    return songs
