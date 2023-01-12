FROM node:alpine

# Définition de l'esapce de travail
WORKDIR /usr/src/app/server

# Copie des fichiers contenant les dépendances dans le repertoire de travail
COPY package*.json ./

# Installation des dépendances avec npm
RUN npm ci

# Copy des différents contenu dans l'espace de travail
COPY . .

# La commande d'entrée pour l'exécution du programme
CMD ["npm", "run", "dev"]