FROM alpine

ENV HUGO_VERSION=0.83.1
ENV NODE_VERSION=16.2.0
ENV PYTHON_VERSION=3.9.5

ENV HUGO_FILE=hugo_${HUGO_VERSION}_Linux-64bit.tar.gz
ENV NODE_FILE=node-v${NODE_VERSION}-linux-x64.tar.xz
ENV PYTHON_FILE=Python-${PYTHON_VERSION}.tar.xz

RUN apk update && apk add curl gnupg
WORKDIR /tmp

# Install Hugo (static site generator)
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_FILE} --output-document /tmp/${HUGO_FILE} && \
    tar -xvzf /tmp/${HUGO_FILE} -C /usr/bin

# Install node.js (bundling assets like CSS and JS)
RUN wget https://nodejs.org/dist/v${NODE_VERSION}/${NODE_FILE} --output-document /tmp/${NODE_FILE} && \
    curl https://nodejs.org/dist/v${NODE_VERSION}/SHASUMS256.txt | grep ${NODE_FILE} | sha256sum -c - && \
    tar -xJf /tmp/${NODE_FILE} -C /usr/bin

# Install Python (used for helper scripts used by statically rendered pages)
RUN wget https://www.python.org/ftp/python/${PYTHON_VERSION}/${PYTHON_FILE} --output-document /tmp/${PYTHON_FILE} && \
    wget https://www.python.org/ftp/python/${PYTHON_VERSION}/${PYTHON_FILE}.asc && \
    gpg --verbose --verify ${PYTHON_FILE}.asc ${PYTHON_FILE} && \
    tar -xJf /tmp/${PYTHON_FILE} -C /usr/bin
