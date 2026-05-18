#!/bin/sh

set -eu

: "${SYMAX_DIRECTUS_URL:=https://cms.symaxsoftware.com}"
: "${SYMAX_PHOENIX_API_URL:=https://phoenix.example.com}"

envsubst '${SYMAX_DIRECTUS_URL} ${SYMAX_PHOENIX_API_URL}' \
  < /usr/share/nginx/html/app-config.template.js \
  > /usr/share/nginx/html/app-config.js
