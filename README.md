# Projet de programmation web - Master 2 informatique(Génie logiciel) - Université de Bordeaux(22-23)




## Objectif

Réalisation d'un projet(libre de choix) en groupe de 3 répondant au cahier des charges suivant :
1. Application Web SPA utilisant côté front un des framework suivants (Angular, React, Vue, Svelte ... ) 
2. Application serveur reposant sur Node.js ou autre techno (Java, .NET)
3. Utilisation d'une base de données pour la persistance des données
4. Communication client-serveur via une API REST
4. Documentation des routes de l'API avec open API (swagger)  
5. Consommation d'une API tierce côté front ou côté back (pas nécessairement une API métier)
6. Gestion de l'authentification 
7. Gestion du déploiement (Docker ou PaaS type Heroku)




## Présentation

Étant un projet libre de choix, nous avons proposé de faire une application web permettant à un utilisateur de 
trouver des recettes personnalisées grâce à son garde-manger. La personnalisation des recettes dépendra du 
contenu de son placard.




### Dénomination

> **Cook Me**




### Téchnologies

1. **Angular** : Pour le frontend
2. **Node js** : NPour le backend
3. **Mongodb** : Pour la base de données
4. **Docker** : Pour le déploiement




### Structure du projet

Nous avons structuré ce projet en deux parties:
- **client** : Dossier contenant le code du frontend
- **server** : Dossier contenant le code du backend



### Installation des dépendances et exécution

#### Manuellement

##### Frontend

Pour le frontend, il faut se mettre sur le dossier **client** depuis la racine du projet avec `cd client` et lancer les commandes suivantes :

> ` npm install ` : pour installer les dépendances

> ` npm start ` ou ` ng serve ` : pour exécuter le projet

Si tout se passe bien, le projet sera accessible avec ` http://localhost:4200/ `


##### Backend

Pour celui-ci, il faut se rendre sur le dossier **server** avec ` cd client ` et faire la suite des commandes suivantes :

> ` npm install ` : pour l'installation des dépendances

> ` npm start ` : pour l'exécution le serveur

Si tout fonctionne correctement, vous pouvez accéder au serveur via : ` http://localhost:8080/api/cookme/ `


#### Avec le script shell

Pour faciliter le lancement de l'app sur http://localhost:4200 à l'aide de scripts :

  > ` sh run.sh ` : démarre l'app en mode dev (patienter quelques secondes)

  > ` sh stop.sh ` : stoppe l'app lancé précédement
  
  > ` sh docker.sh ` : démarre l'app sur docker, ctrl+C pour l'arreter


## Configuration docker

Après le clonage du projet, il faut tout simplement se mettre dans le repertoire principal du projet en exécutant la commande `cd Cookme`, vérifier que docker-compose est bien installé sur la machine avec la commande `docker-compose --version` et ensuite exécuter les commandes suivantes pour accéder au projet :

  > ` docker-compose build ` : pour la construction de l'image docker

  > ` docker-compose up ` : pour l'éxécution de l'image
  
  > ` docker-compose down ` : pour arrêter l'éxécution
 
  
  
## Documentation Openapi

Pour accéder à la documentation (swagger) de nos routes, assurez-vous que l'image docker a été bien exécuter en utilisant la commande : ` docker ps ` qui affiche tous les conteneurs en cours d'exécution. Si c'est le cas, vous n'aurez pas besoin de suivre les étapes suivantes et vous pouvez directement accéder à la documentation via le lien ci-dessous sinon, il faut :

> Accéder au répertoire du backend avec : ` cd server `

> Installer les dépendances avec : ` npm install `

Si tout se passe bien, la documentation sera accessible via le lien suivant : ` http://localhost:8080/api/cookme/api-docs/ `.

**NB** : Certaines routes nécessitent l'utilisation d'un token qui sera généré lors de la connexion `/login` donc il faudra au préalable se connecter et dans la réponse de cette route, il y aura le token à copier dans `Authorize` pour débloquer les autres routes.




## Auteurs

- [@hdevidas](https://github.com/hdevidas)
- [@agbarry](https://www.github.com/agbarry)
- [@Kiiroyo](https://github.com/Kiiroyo)
