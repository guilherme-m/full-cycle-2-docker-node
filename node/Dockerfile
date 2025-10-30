FROM node:20-alpine

WORKDIR /app

COPY app/ .

ENV DOCKERIZE_VERSION=v0.9.6

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget
    
RUN npm install

EXPOSE 3000



ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "20s", "node", "index.js"]

