const e = require('express');
const db = require('../db'); //Chemin vers les infos de connexion à la db
const userQueries = require('./user');

exports.fileInsertInto  = function(title, fileType, fileData, userID) {
    return new Promise((resolve, reject) => {
        if (type == "customer") {
            userQueries.getUserID(bankname).then((ID_bank) => {
                db.query(
                    "INSERT INTO Files SET ?",
                    {
                    Title: title,
                    File_type: fileType,
                    File_data: fileData,
                    ID_user: userID,
                    },
                    (error, results) => {
                        if (error) {
                            // Gérer les erreurs d'insertion dans la base de données
                            console.error(error);
                            reject(new Error("Une erreur s'est produite lors de l'insertion du fichier."));
                        } else {
                            console.log(
                            "Fichier inséré avec succès dans la base de données."
                            );
                        }
                    }
                );
            });
        }
    })
}