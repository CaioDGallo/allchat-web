FROM node:10.19.0

USER root

WORKDIR /home/caiogallo/Documents/allchat-web

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]