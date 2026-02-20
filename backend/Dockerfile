FROM node:18-alpine

WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json ./
RUN npm install

# On copie le code
COPY . .

EXPOSE 3000

# Commande de lancement
CMD ["node", "server.js"]