# versão do node
FROM node:20

# pasta raiz do projeto
WORKDIR /app

# dependencias do projeto
COPY package*.json ./

# instala as dependências
RUN npm install

# copiar o restante do código
COPY . .

# expor na porta 3000
EXPOSE 3000

# omando para iniciar o app em modo dev
CMD ["npm", "run", "dev"]
