FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add global @nestjs/cli

RUN yarn install

COPY . .

RUN yarn build

FROM node:lts-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
