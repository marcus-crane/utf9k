###
# Builder image
###

FROM alpine:3.14.0 AS builder
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

# Download nginx-prometheus-exporter (to be started in non-builder container)
RUN wget https://github.com/martin-helmich/prometheus-nginxlog-exporter/releases/download/v1.9.0/prometheus-nginxlog-exporter_1.9.0_linux_amd64.tar.gz --output-document /tmp/prometheus-nginxlog-exporter.tar.gz && \
    mkdir /tmp/prometheus-nginxlog-exporter && \
    tar -xvzf /tmp/prometheus-nginxlog-exporter.tar.gz -C /tmp/prometheus-nginxlog-exporter

# Set up Python
RUN ln -sf python3 /usr/bin/python && python3 -m ensurepip && pip3 install --no-cache --upgrade pip setuptools

WORKDIR /utf9k
COPY . /utf9k

RUN export PATH=$PATH:/usr/bin

RUN npm install -g yarn && yarn install
RUN yarn run generate-fancy-links
RUN yarn build

###
# Deployment image
###
FROM nginx:1.21.0

ENV NGINX_PORT=8080

# Install Vector to ship logs
RUN curl -1sLf 'https://repositories.timber.io/public/vector/cfg/setup/bash.deb.sh' | bash && \
    apt-get update && apt-get install vector

WORKDIR /var/www/utf9k
COPY --from=builder /utf9k/public .
COPY --from=builder /utf9k/deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /utf9k/deploy/startup.sh /tmp/startup.sh
COPY --from=builder /utf9k/deploy/config.hcl /tmp/config.hcl
COPY --from=builder /tmp/prometheus-nginxlog-exporter/prometheus-nginxlog-exporter /usr/bin
COPY --from=builder /utf9k/deploy/vector.toml /etc/vector/vector.toml

CMD ["bash", "/tmp/startup.sh"]
