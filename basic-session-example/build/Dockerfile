FROM node
RUN npm install -g yarn

RUN mkdir /app
WORKDIR /app
RUN yarn install
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
