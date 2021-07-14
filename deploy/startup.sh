#!/bin/bash
echo "Removing default nginx log symlinks"
rm /var/log/nginx/access.log
rm /var/log/nginx/error.log
echo "Booting up nginx"
nginx -g "daemon on;"
sleep 5
echo "Booting up Vector"
vector -c /etc/vector/vector.toml
echo "Booting up Prometheus nginxlog exporter"
/usr/bin/prometheus-nginxlog-exporter -config-file /tmp/config.hcl
