import os
from pathlib import Path

CUR_DIR = os.path.dirname(os.path.realpath(__file__))
CONTENT_FILES = f"{CUR_DIR}/../content"

def walk_content_folder(path: str, ext: str):
    matches = set()
    for dir, _, files in os.walk(path):
        for file in files:
            if Path(file).suffix == ext:
                file_path = str(Path(dir, file))
                matches.add(file_path)
    return list(matches)