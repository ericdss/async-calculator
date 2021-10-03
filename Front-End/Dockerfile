# node/angular
FROM node:latest AS angular

WORKDIR /app
COPY package*.json .
RUN npm install --silent

COPY . .

RUN npm run build

# nginx
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/Front-End /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t front-end .