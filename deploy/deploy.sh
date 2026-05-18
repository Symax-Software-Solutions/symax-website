#!/usr/bin/env bash

set -euo pipefail

REPO_DIR="${DEPLOY_PATH:-/srv/symax-website}"
BRANCH="${DEPLOY_BRANCH:-master}"
COMPOSE_FILE="deploy/docker-compose.yml"
ENV_FILE=".env.production"

cd "$REPO_DIR"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE in $REPO_DIR"
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing to deploy from a dirty checkout"
  git status --short
  exit 1
fi

git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" pull directus
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --build
