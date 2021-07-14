#!/bin/bash
echo "Booting up nginx"
nginx -g "daemon on;"
sleep 5
echo "Booting up Filebeat"
filebeat modules enable nginx
filebeat setup -e
echo "Booting up Prometheus nginxlog exporter"
/usr/bin/prometheus-nginxlog-exporter -config-file /tmp/config.hcl
