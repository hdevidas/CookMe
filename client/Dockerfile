# Utilisation de l'image de Node.js 14 sur Alpine Linux
FROM node:14-alpine

# Définition du répertoire de travail sur /app
WORKDIR /app/client

ENV NG_CLI_VERSION=11.0.3

# Copie des fichiers de l'application dans le conteneur
COPY . .

# Installation des dépendances de l'application
RUN npm install

# Génération des fichiers de production
RUN npm run build

RUN npm install -g @angular/cli

ENV PATH="$PATH:/usr/local/lib/node_modules/@angular/cli/bin"

# Exposition du port 4200 pour l'application Angular
EXPOSE 4200

# Démarrage de l'application avec la commande npm start
CMD ["ng", "serve", "--host", "0.0.0.0"]