import json
import os

exclude = set(['resources', 'public', 'node_modules', '.github', '.cache', '.git', '.DS_Store', 'venv', '.venv'])
file_metadata = []

# Taken from https://stackoverflow.com/questions/1094841/get-human-readable-version-of-file-size
def sizeof_fmt(num, suffix='B'):
    for unit in ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Yi', suffix)

for root, dirs, files in os.walk('.', topdown=True):
    dirs[:] = [d for d in dirs if d not in exclude]
    path = root.split(os.sep)
    for file in files:
        full_path = f"{'/'.join(path)}/{file}"
        file_metadata.append({
            'path': full_path,
            'size': os.stat(full_path).st_size,
            'type': os.path.splitext(full_path)[1]
        })

file_metadata = sorted(file_metadata, key = lambda i: i['size'], reverse=True)

for file in file_metadata:
    file['size'] = sizeof_fmt(file['size'])

with open('data/filesizes.json', 'w') as file:
    json.dump(file_metadata, file, indent=2)
