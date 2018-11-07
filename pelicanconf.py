#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os

DEV_MACHINES = ['LM-C02VR8K2HTD6']
SYSTEM = os.uname().nodename

AUTHOR = 'Marcus Crane'
SITENAME = 'utf9k'
if SYSTEM in DEV_MACHINES:
    SITEURL = 'http://localhost:8000'
else:
    SITEURL = 'https://utf9k.net'
MENUITEMS = [('Projects', '/projects.html'), ('Blog', '/blog.html'), ('Stats', '/stats.html')]
THEME = 'themes/utf9k'
THEME_STATIC_DIR = ''

PATH = 'content'
CSS_FILE = 'css/style.css'

ARTICLE_PATHS = ['blog', 'projects']
ARTICLE_SAVE_AS = '{category}/{slug}.html'
ARTICLE_URL = '{category}/{slug}.html'
CATEGORY_URL = '{slug}.html'
CATEGORY_SAVE_AS = '{slug}.html'
DRAFT_URL = '{drafts}/{slug}.html'
DRAFT_SAVE_AS = '{drafts}/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'

TIMEZONE = 'Pacific/Auckland'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
# USE_FOLDER_AS_CATEGORY = True
