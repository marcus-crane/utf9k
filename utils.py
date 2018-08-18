from glob import glob

import mistune
from mistune_contrib import meta
import pendulum

from renderer import renderer
from settings import Settings

markdown = mistune.Markdown(renderer=renderer)


def list_content(folder, base=Settings.CONTENT_BASE, format_date=True):
    folder = glob(f'{base}{folder}/*.md')
    content = list()
    for entry in folder:
        with open(entry) as file:
            file = file.read()
            metadata = meta.parse(file)[0]
            if format_date:
                metadata['date'] = pendulum.parse(metadata['date'])
            content.append(metadata)
    if format_date:
        content = sort_content(content)
    return content

def sort_content(posts):
    posts.sort(key=lambda item: item['date'], reverse=True)
    for post in posts:
        post['date'] = post['date'].to_formatted_date_string()
    return posts

def view_content(file_path, base=Settings.CONTENT_BASE, format_date=True):
    content = dict()
    with open(f'{base}{file_path}.md') as file:
        item = meta.parse(file.read())
        if format_date:
            item[0]['date'] = pendulum.parse(
                item[0]['date']).to_formatted_date_string()
        content['metadata'] = item[0]
        content['body'] = markdown(item[1])
        return content
