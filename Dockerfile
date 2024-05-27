FROM node:18 AS builder

WORKDIR /app

COPY package*.json /app/

COPY . /app

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--proxy-config", "proxy.conf.json", "--host", "0.0.0.0"]