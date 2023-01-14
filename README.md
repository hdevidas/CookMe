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
contenu de son placard


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


## Configuration docker

Après le clonnage du projet, il faut tout simplement se mettre dans le repertoire principal du projet en éxécutant la commande `cd Cookme`, vérifier que docker-compose est bien installé sur la machine avec la commande `docker-compose --version` et ensuite éxécuter les commandes suivantes pour accéder au projet :

  > ` docker-compose build ` : pour la construction de l'image docker

  > ` docker-compose up ` : pour l'éxécution de l'image
  
  > ` docker-compose down ` : pour arrêter l'éxécution

## Auteurs

- [@hdevidas](https://github.com/hdevidas)
- [@agbarry](https://www.github.com/agbarry)
- [@Kiiroyo](https://github.com/Kiiroyo)
