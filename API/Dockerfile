FROM node:14-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm","start"]

# docker build -t api .