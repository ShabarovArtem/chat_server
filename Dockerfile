FROM node:18

ENV UID=1000
ENV USER node

WORKDIR /app

ENV API_HOST="0.0.0.0"
ENV API_PORT=9000

COPY src/ src/

COPY package.json tsconfig.json ./

RUN npm install

CMD ["npm", "start"]