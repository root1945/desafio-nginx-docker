FROM node:14-alpine AS builder

WORKDIR /home/node/app

COPY package*.json ./

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

RUN npm install

ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "20s", "docker-entrypoint.sh"]

CMD [ "npm" , "start" ]

EXPOSE 3000