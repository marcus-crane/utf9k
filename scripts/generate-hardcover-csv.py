import csv

from ruamel.yaml import YAML

def represent_none(self, data):
    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')

yaml = YAML()
yaml.default_flow_style = False
yaml.width = 4096 # avoid line wrap
yaml.representer.add_representer(type(None), represent_none)

DATA_FILE = "_data/books.yml"

field_names = [
    'Title',
    'Author',
    'Status',
    'ISBN 13',
    'ASIN',
    'Date Added',
    'Date Started',
    'Date Finished'
]

book_data = {}

with open(DATA_FILE, "r") as file:
    books = yaml.load(file.read())
    with open('books.csv', 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=field_names)
        writer.writeheader()

        for book in books[7]['books']:
            title = book['title']
            subtitle = book['subtitle']
            if book['subtitle'] is not None:
                title = f"{title}: {subtitle}"
            author = book['author']
            isbn13 = book['isbn13']
            asin = book['asin']
            date_added = book['date_added']
            date_started = book['date_started']
            date_finished = book['date_finished']

            if date_added is not None:
                date_added = date_added.strftime("%Y-%m-%d")
            
            if date_started is not None:
                date_started = date_started.strftime("%Y-%m-%d")

            if date_finished is not None:
                date_finished = date_finished.strftime("%Y-%m-%d")

            writer.writerow({
                'Title': title,
                'Author': author,
                'Status': 'Read',
                'ISBN 13': isbn13,
                'ASIN': asin,
                'Date Added': date_added,
                'Date Started': date_started,
                'Date Finished': date_finished
            })

