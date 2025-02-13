#!/bin/sh
if [ -z ${BACKEND_URL+x} ]; then
  echo "BACKEND_URL variable is not set" && exit
else
  ESCAPED_URL=$(printf '%s\n' "$BACKEND_URL" | sed 's/[\/&]/\\&/g')
  find /usr/share/nginx/html -type f -exec sed -i "s|http://localhost:5001/|$ESCAPED_URL|g" {} +
fi

