#!/bin/bash
echo "Booting up nginx"
nginx -g "daemon on;"
echo "Booting up Prometheus nginx exporter"
./usr/bin/nginx-prometheus-exporter -config-file /tmp/config.hcl
