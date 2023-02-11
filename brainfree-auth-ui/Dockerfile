FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn global add http-server
RUN ng prod


FROM nginx:stable-alpine
LABEL version="1.0"

EXPOSE 8080

WORKDIR /usr/share/nginx/html
COPY --from=production /usr/src/app/dist/brainfree-auth-ui /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
