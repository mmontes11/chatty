#!/usr/bin/env bash

# Requirements
# ttab: https://github.com/mklement0/ttab

docker-compose -f docker-compose.mongo.yml up -d
echo "Starting... 🚀"
ttab -t "back" "cd packages/back; npm start"
ttab -t "front" "cd packages/front; npm start"
