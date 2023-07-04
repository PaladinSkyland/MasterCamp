# Credit Express

Lien du github : https://github.com/PaladinSkyland/MasterCamp

## Description

Credit Express est une platforme en ligne d'annonce de demande de prêt qui met en relation le client directement avec le banquier sans passer par un intermédiaire

Ce prototype a pour objectif de simuler un site internet sur lequel des clients viendraient faire des annonces de demande de prêt, et des employés de banques les contacteraient via la messagerie intégrée

Les principales fonctionnalités sont : 
    - Messagerie entre un client et un employé de banque
    - Annonce de demande de prêt pour une banque spécifique ou ouvert à toutes les banques
    - Dépôt de fichiers de justification
    - Gestion des banques et des employés par l’administrateur
    - Suivis de demande après qu’un employé est accepté de négocier cette demande
    - Finalisation d’un contrat
    - Gestion de comptes
    - Sécurisation des données

## Installation

- Importer la BDD (déjà peuplée)
- Exécuter npm install dans le dossier "server" puis dans le dossier "client"
- Configuration des .env : 

- Dans le fichier .env se trouvant dans "server" mettre :

- Si récupération du .env via le .zip

    * MYSQL_HOST : l’ip et le port la BDD sur votre ordinateur
    * MYSQL_USER : votre utilisateur MYSQL
    * MYSQL_PASSSWORD : le mot de passe de votre utilisateur MYSQL

    Le reste des clés sont déjà attribuées 

- Si récupération du .env via github : 
    

    * MYSQL_DATABASE = creditexpressdb ou CreditExpressDB sur Linux
    * MYSQL_HOST : l’ip et le port la BDD sur votre ordinateur
    * MYSQL_USER : votre utilisateur MYSQL
    * MYSQL_PASSSWORD : le mot de passe de votre utilisateur MYSQL
    * MYSQL_CLIENT : mysql
    * secretKey : valeur de votre au choix
    * cryptedKey : 12
    * cipherKey : valeur de votre au choix en héxadécimal
    * IV : valeur de votre choix en héxadécimal

- Dans le terminal cd /server éxecuter: npm run server
- Dans le terminal cd /client éxecuter : npm run client

- Dans le fichier .env se trouvant dans "client" mettre :

    * cryptedKey : 11

## Utilisation

Aller voir le scénario dans le compte rendu à IX. Scénario

- Les fichiers de test (Avis d'imposition, salaire etc...) sont disponibles dans le .zip pour pouvoir être importés sur le site
