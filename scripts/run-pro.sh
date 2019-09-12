#!/usr/bin/env bash

npm run build
docker-compose -f docker-compose.mongo.yml -f docker-compose.yml up -d --build