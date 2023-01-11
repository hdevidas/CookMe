FROM node:alpine as build-stage

# # Définition de l'esapce de travail
WORKDIR /usr/src/app

# # Copie des fichiers contenant les dépendances dans le repertoire de travail
COPY package*.json ./

# # Installation des dépendances
RUN npm install

# # Copie des différents repertoires dans l'espace de travail
COPY . .

# Création du build
RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]