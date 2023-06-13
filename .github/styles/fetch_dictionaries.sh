#!/usr/bin/env bash

BASEDIR="$(dirname -- "$0")"

wget -nc -O "$BASEDIR/dics/en_AU.aff" https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_AU.aff
wget -nc -O "$BASEDIR/dics/en_AU.dic" https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_AU.dic

wget -nc -O "$BASEDIR/dics/en_GB.aff" https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_GB.aff
wget -nc -O "$BASEDIR/dics/en_GB.dic" https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_GB.dic

wget -nc -O "$BASEDIR/dics/en_US.aff" https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_US.aff
wget -nc -O "$BASEDIR/dics/en_US.dic" https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_US.dic