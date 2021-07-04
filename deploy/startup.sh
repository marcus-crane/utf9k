#!/bin/bash
echo "Booting up nginx"
nginx -g "daemon on;"
echo "Booting up Prometheus nginx exporter"
./usr/bin/prometheus-nginxlog-exporter -config-file /tmp/config.hcl
