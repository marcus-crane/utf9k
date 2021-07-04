FROM alpine AS builder
ENV PYTHONUNBUFFERED=1

ENV HUGO_VERSION=0.83.1
ENV NODE_VERSION=16.2.0
ENV PYTHON_VERSION=3.9.5

ENV HUGO_FILE=hugo_${HUGO_VERSION}_Linux-64bit.tar.gz

# Ideally install Node and Python from source to pin packages
RUN apk update && apk add --no-cache curl gnupg nodejs npm python3 git
WORKDIR /tmp

## TODO: Add checksum validation (tried but it's fiddly)

# Install Hugo (static site generator)
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_FILE} --output-document /tmp/${HUGO_FILE} && \
    mkdir /tmp/hugo && \
    tar -xvzf /tmp/${HUGO_FILE} -C /tmp/hugo && \
    mv /tmp/hugo/hugo /usr/bin

# Set up Python
RUN ln -sf python3 /usr/bin/python && python3 -m ensurepip && pip3 install --no-cache --upgrade pip setuptools

WORKDIR /utf9k
COPY . /utf9k

RUN export PATH=$PATH:/usr/bin

RUN npm install -g yarn && yarn install
RUN yarn run generate-fancy-links
RUN yarn build

FROM nginx:1.21.0

ENV NGINX_PORT=8080

WORKDIR /var/www/utf9k
COPY --from=builder /utf9k/public .
COPY --from=builder /utf9k/nginx.conf /etc/nginx/nginx.conf
