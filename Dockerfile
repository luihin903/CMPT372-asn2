FROM node

ENV TZ=America/Vancouver
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

# WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

# COPY ./src .

EXPOSE 3000

CMD ["node", "index.js"]