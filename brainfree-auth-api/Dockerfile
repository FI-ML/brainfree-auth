FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR user/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY .. .

RUN yarn build

CMD ["yarn", "dist/main"]
