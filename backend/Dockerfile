FROM kicho94/testnodeapp

EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["node", "services/products.js" ]






