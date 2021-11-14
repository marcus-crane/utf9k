from glob import glob
import os
import shutil

import git

REPO_URL = "https://github.com/marcus-crane/dotfiles"
CLONE_PATH = os.getcwd() + '/dotfiles'
DOTFILE_CONTENT = os.getcwd() + '/content/dotfiles/'

repo = git.Repo.clone_from(REPO_URL, CLONE_PATH, branch='main')

shutil.rmtree(DOTFILE_CONTENT)
os.mkdir(DOTFILE_CONTENT)

literate_dotfiles = glob(CLONE_PATH + '/*.md')

for doc in literate_dotfiles:
    if 'README.md' not in doc:
        shutil.move(doc, DOTFILE_CONTENT)

shutil.rmtree(CLONE_PATH)

print("~ Successfully imported dotfiles")
