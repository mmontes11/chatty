FROM node:8

ENV WORKDIR /usr/src/apollo-express-mongo-boilerplate

RUN mkdir ${WORKDIR}

WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}

RUN npm install --production

ADD dist ${WORKDIR}

CMD ["npm", "run", "production"]