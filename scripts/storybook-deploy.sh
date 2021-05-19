#!/bin/bash -x

# export COMPOSE_DOCKER_CLI_BUILD=1
# export DOCKER_BUILDKIT=1

git pull

source ../.env

docker-compose -f docker-compose.storybook-deploy.yml down
docker-compose -f docker-compose.storybook-deploy.yml build
docker-compose -f docker-compose.storybook-deploy.yml up -d

exit
