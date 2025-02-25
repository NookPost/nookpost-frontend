#!/bin/sh
if [ -z ${BACKEND_URL+x} ]; then
  echo "BACKEND_URL variable is not set" && exit
	BACKEND_URL="https://nookpost-dev-api.jkulzer.dev"
else
  find /usr/share/nginx/html -type f -exec sed -i "s|http://localhost:5001|$BACKEND_URL|g" {} +
fi

