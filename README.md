# chatty-server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Apollo + Express + MongoDB chat server.

### Development

```bash
$ npm start
```

### Lint

```bash
$ npm run lint
```

### Build Image

```bash
$ npm run build 
$ docker build -t chatty-server .
```

### DockerHub

Image available on [Docker Hub](https://hub.docker.com/r/mmontes11/apollo-express-mongo-boilerplate/)

### Production

1. Create a `.env` with the variables used below:
- [docker-compose.yml](https://github.com/mmontes11/apollo-express-mongo-boilerplate/blob/master/docker-compose.yml)
- [production.js](https://github.com/mmontes11/apollo-express-mongo-boilerplate/blob/master/src/config/production.js)

2.  `$ docker-compose up -d`
