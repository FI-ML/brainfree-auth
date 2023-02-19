FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN npm run build


FROM nginx:1.22.0-alpine

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/brainfree-auth-ui /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

