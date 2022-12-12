FROM node:18-alpine AS base
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
ENV HOME /app
WORKDIR ${HOME}
COPY package.json ${HOME}/
COPY yarn.lock tsconfig.json nest-cli.json tsconfig.build.json ${HOME}/
COPY src/ ${HOME}/src
RUN yarn install
COPY .eslintrc.js ${HOME}

EXPOSE 80
