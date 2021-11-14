import os
from pathlib import Path
import re

import yaml

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

CUR_DIR = os.path.dirname(os.path.realpath(__file__))
CONTENT_FILES = f"{CUR_DIR}/../content"

METADATA_REGEX = "(?:---\\n?)(.*)(?:\\n?)---"
IMAGE_SRC_REGEX = "src=\"(.*)\""

def walk_content_folder(path: str, ext: str):
    matches = set()
    for dir, _, files in os.walk(path):
        for file in files:
            if Path(file).suffix == ext:
                file_path = str(Path(dir, file).resolve())
                matches.add(file_path)
    return list(matches)

def extract_header(content: str):
    meta_indexes = [i for i, x in enumerate(content.split('\n')) if x == '---']
    meta_start = meta_indexes[0] + 1
    meta_end = meta_indexes[1]
    text_header = '\n'.join(content.split('\n')[meta_start:meta_end])
    return yaml.load(text_header, Loader=Loader)

def get_image_path(post_path, image_name):
    return str(Path(post_path).parent / image_name)

def get_image_name(image_params):
    # TODO: Will break if src isn't first in the list of params
    return re.match('src="(.*)"', image_params)[1]