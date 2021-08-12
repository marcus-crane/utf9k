#!/bin/bash
echo "Removing default nginx log symlinks"
rm /var/log/nginx/access.log
rm /var/log/nginx/error.log
echo "Booting up nginx"
nginx -g "daemon on;"
