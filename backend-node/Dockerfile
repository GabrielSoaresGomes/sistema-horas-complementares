FROM node:18
WORKDIR /usr/src/app

# Instalando dependências
COPY package.json ./
RUN npm install

# Copiando arquivos do projeto
COPY ./server.js ./server.js
COPY ./main.js ./main.js
COPY ./entity ./entity
COPY ./routes ./routes
COPY ./components ./components
COPY ./.env ./.env

# Escolhendo a porta que o projeto vai rodar
EXPOSE 2004

# Comando que será executado para rodar o projeto
CMD [ "node", "server.js" ]
