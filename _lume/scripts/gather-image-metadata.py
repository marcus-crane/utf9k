import json
import os
from pathlib import Path
import re

from common import (
    CONTENT_FILES,
    CUR_DIR,
    walk_content_folder,
    extract_header,
    get_image_path,
    get_image_name
)

DATA_FILE = "_data/imagemetadata.json"
IMAGE_SHORTCODE = "!["
IMAGECODE_REGEX = r"!\[.*]\(.*\)"

markdown_files = walk_content_folder(CONTENT_FILES, ".md")

posts_with_images = {}
image_metadata = []

for post in markdown_files:
    with open(post, 'r') as file:
        contents = file.read()
        if IMAGE_SHORTCODE in contents:
            posts_with_images[post] = contents

for post_path in posts_with_images:
    content = posts_with_images[post_path]
    header = extract_header(content)
    # :vomit: I should really tidy this up in future but it worksTM
    rendered_path = '/' + '/'.join(post_path.split('/content/')[1].split('/')[:-1])
    r = re.findall(IMAGECODE_REGEX, content)
    for match in r:
        image_name = get_image_name(match[0])
        inferred_url = f"/{header.get('category')}/{header.get('slug')}"
        image_metadata.append({
            "title": header.get('title'),
            "slug": header.get('slug'),
            "post_path": rendered_path,
            "rendered_path": inferred_url,
            "image_params": match[0],
            "alt_text_present": bool(match[1]),
            "alt_text": match[1],
            "image_name": image_name,
            "image_path": get_image_path(post_path, image_name).split('content')[1]
        })

with open(DATA_FILE, 'w') as file:
    json.dump(image_metadata, file, indent=2)

print("~ Gathered image metadata")