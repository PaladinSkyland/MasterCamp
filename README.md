# Credit Express

Lien du github : https://github.com/PaladinSkyland/MasterCamp

## Description

Credit Express est une platforme en ligne d'annonce de demande de prêt qui met en relation le client directement avec le banquier sans passer par un intermédiaire

Ce prototype a pour objectif de simuler un site internet sur lequels des clients viendraient faire des annonce de demande de prêt, et des employé de banque les contacterais via la messagerie intégrée

Les principales fonctionalités sont : 
    - Messagerie entre un client et un employé de banque
    - Annonce de demande de prêt pour une banque spécifique ou ouvert à toutes les banques
    - Dépôt de fichiers de justification
    - Gestion des banques et employés par l’administrateur
    - Suivis de demande après qu’un employé est accepté de négocier cette demande
    - Finalisation d’un contrat
    - Gestion de compte
    - Sécurisation des données

## Installation

- Importer la BDD (elle est déjà peuplée)
- Ecrire npm install dans le dossier server puis dans le dossier client
- Dans le fichier .env se trouvant dans server remplacer :
    * MYSQL_HOST : (l’ip et le port la BDD sur votre ordinateur)
    * MYSQL_USER : (votre utilisateur MYSQL)
    * MYSQL_PASSSWORD : (le mot de passe de votre utilisateur MYSQL)
- Dans le dossier server écrire : npm run server
- Dans le dossier client écrire : npm run client

## Utilisation

Aller voir le scénario dans le compte rendu à IX. Scénario
