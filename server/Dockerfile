# Utilisation de l'image de Node.js 14 sur Alpine Linux
FROM node:14-alpine

# Définition du répertoire de travail sur /app
WORKDIR /app

# Copie des fichiers de l'application dans le conteneur
COPY . /app/

# Installation des dépendances de l'application
RUN npm install

# Exposition du port 3000 pour l'application Node.js
EXPOSE 8080

# Démarrage de l'application avec la commande npm start
CMD ["npm", "run", "dev"]
