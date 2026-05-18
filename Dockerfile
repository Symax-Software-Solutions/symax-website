FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine

RUN apk add --no-cache gettext

COPY deploy/nginx/frontend.conf /etc/nginx/conf.d/default.conf
COPY deploy/frontend/40-app-config.sh /docker-entrypoint.d/40-app-config.sh
COPY deploy/frontend/app-config.template.js /usr/share/nginx/html/app-config.template.js
COPY --from=build /app/dist/symax-website/browser /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.d/40-app-config.sh

EXPOSE 80
