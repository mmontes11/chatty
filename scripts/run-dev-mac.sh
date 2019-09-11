#!/usr/bin/env bash

# Requirements
# ttab: https://github.com/mklement0/ttab

ttab -t "back" "npm run start:back"
ttab -t "front" "npm run start:front"
