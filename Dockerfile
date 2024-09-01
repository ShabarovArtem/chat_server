FROM node:18-alpine

ENV UID=1000
ENV USER node

WORKDIR /app

ENV API_HOST="0.0.0.0"
ENV API_PORT=9000

COPY package*.json ./

RUN npm install

COPY . .

CMD npm start