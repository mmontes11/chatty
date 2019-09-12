#!/usr/bin/env bash

# Requirements
# ttab: https://github.com/mklement0/ttab

ttab -t "back" "cd packages/back; npm start"
ttab -t "front" "cd packages/front; npm start"
