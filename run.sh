#!/usr/bin/env bash
set -Eeuo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")" || exit 1

function isAvailable() {
  if [ -x "$(command -v "${1}")" ]; then
    return 0
  else
    return 1
  fi
}

function exitScript() {
  echo "${1} was not found. Please install ${1}"
  echo
  exit 1
}

isAvailable "docker" || exitScript "docker"
isAvailable "docker-compose" || exitScript "docker-compose"

docker-compose --profile=dev up --build -d
docker exec onlyfy_test_app npm run typeorm:migrate
