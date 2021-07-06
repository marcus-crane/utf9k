listen {
  port = 9091
  metrics_endpoint = "/metrics"
}

namespace "utf9k" {
  format = "$remote_addr - $remote_user [$time_local] \"$request\" $status $body_bytes_sent \"$http_referer\" \"$http_user_agent\" \"$http_x_forwarded_for\""
  source {
    files = [
      "/var/log/nginx/utf9k.access.log"
    ]
  }

  labels {
    app = "utf9k"
  }

  histogram_buckets = [.005, .01, .025, .05, .1, .25, .5, 1, 2.5, 5, 10]

  relabel "request_uri" {
    from = "request"
    split = 2

    match "^(/[^?]{0,})*(.*)$" {
      replacement = "$1"
    }
  }
}
