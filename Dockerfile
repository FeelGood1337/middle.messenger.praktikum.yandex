FROM node:12-alpine
WORKDIR /app
COPY ./server.js ./package*.json ./webpack.config.js ./tsconfig.json ./
COPY ./src src
COPY ./static static
RUN npm install
EXPOSE 3000
CMD node server.js
