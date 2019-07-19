### STAGE 1: Build ###
FROM node:latest as builder
# Preparing working environment.
RUN mkdir -p /usr/src/angularApp
WORKDIR /usr/src/angularApp
# Installing dependencies.
COPY package*.json /usr/src/angularApp/
RUN npm install
# Copy openhome-panel source into image.
COPY . /usr/src/angularApp
# Building app.
RUN npm run-script build

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
# COPY dist /usr/share/nginx/html
COPY --from=builder /usr/src/angularApp/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080
