# Projet-DevOps
TP DevOps - Gestion d'événements (Maya Hamdy)
Ce dépôt contient le projet final de DevOps. L'objectif était de mettre en place une infrastructure complète automatisée avec Docker et une chaîne CI/CD via GitHub Actions.

Lancement du projet
Pour démarrer l'ensemble des services en local, utilisez la commande suivante :

Bash
docker compose up --build
Le frontend est accessible sur : http://localhost:8080

L'API (données JSON) est accessible sur : http://localhost:3000/api/events

Architecture technique
Le projet est découpé en trois services conteneurisés :

Frontend : Serveur Nginx qui distribue les fichiers statiques (HTML/JS).

Backend : API REST développée avec Node.js et Express.

Base de données : Instance PostgreSQL 15 pour le stockage des événements.

Pipeline CI/CD
J'ai configuré un workflow GitHub Actions qui s'exécute à chaque push sur la branche main :

Tests : Utilisation d'une stratégie de matrice pour tester le build sur les versions Node.js 18, 20 et 22.

Déploiement : Le frontend est automatiquement mis à jour sur la branche gh-pages pour l'hébergement web.

Docker : Simulation des étapes de build et de push d'images.

Problèmes résolus
Pendant le développement, j'ai dû faire face à plusieurs blocages techniques :

CORS : Le navigateur bloquait les requêtes du front vers le back. J'ai dû configurer le module cors dans Express pour autoriser les appels.

Cache Docker : Les modifications de code n'étaient pas prises en compte. La solution a été d'utiliser l'option --build et de corriger la gestion des volumes qui écrasaient les fichiers du container.

YAML : Plusieurs échecs de pipeline à cause de mauvaises indentations dans le fichier de workflow, notamment pour les triggers de branche.

Ports : Conflits sur le port 8080 résolus en nettoyant systématiquement les anciens containers avec docker compose down.

Organisation des branches
main : Branche principale contenant la version stable.

backend : Branche de développement pour la partie API (fusionnée via Pull Request).

gh-pages : Branche dédiée au déploiement statique automatisé.