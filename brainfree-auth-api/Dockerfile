#################
## DEVELOPMENT ##
#################

FROM node:18-alpine as development

WORKDIR user/src/app

COPY package*.json ./

RUN yarn install

RUN yarn build

EXPOSE 3000

################
## PRODUCTION ##
################

FROM node:18-alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR user/src/app

COPY --from=development /user/src/app .

EXPOSE 3000

CMD ["yarn", "dist/main"]

