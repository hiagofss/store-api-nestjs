FROM node:20-alpine

RUN apk add --no-cache bash

RUN npm i -g npm@latest

RUN npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app

COPY . .