FROM python:3.7-alpine

RUN mkdir /code

COPY . /code
WORKDIR /code

RUN pip install -U pipenv
RUN pipenv install --system --deploy

CMD ["python", "app.py"]