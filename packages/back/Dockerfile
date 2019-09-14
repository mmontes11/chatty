FROM node:8

ARG WAIT_FOR_IT=mongo:27017
ENV WAIT_FOR_IT=${WAIT_FOR_IT}
ENV WORKDIR /usr/src/back

RUN mkdir ${WORKDIR}

WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}

RUN npm install --production

ADD dist ${WORKDIR}

COPY scripts/wait-for-it.sh ${WORKDIR}

RUN chmod +x ${WORKDIR}/wait-for-it.sh 

CMD ${WORKDIR}/wait-for-it.sh ${WAIT_FOR_IT} -- npm run production