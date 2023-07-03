const db = require('../db'); //Chemin vers les infos de connexion à la db

exports.CheckIfFileExist = function(fileType, userID) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Files WHERE File_type = ? AND ID_user = ?", 
            [fileType, userID], 
            (error, results) => {
                if (error) {
                    console.error(error);
                    reject(new Error("CheckIfFileExist : Une erreur s'est produite"));
                }
                else {
                    resolve(true);
                }
            }
        )
    })
}

exports.DeleteFile = function(fileType, userID) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM Files WHERE File_type = ? AND ID_user = ?", 
            [fileType, userID],
            (error, results) => {
                if (error) {
                    console.error(error);
                    reject(new Error("DeleteFile : Une erreur s'est produite"));
                }
                else {
                    resolve(true);
                }
            }
        )
    })
}

exports.fileInsertInto = function(title, fileType, filePath, userID) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Files SET ?",
            {
                Title: title,
                File_type: fileType,
                File_path: filePath,
                ID_user: userID,
            },
            (error, results) => {
                if (error) {
                    // Gérer les erreurs d'insertion dans la base de données
                    console.error(error);
                    reject(new Error("Une erreur s'est produite lors de l'insertion du fichier."));
                } 
                else {
                    console.log("Fichier inséré avec succès dans la base de données.");
                    resolve(true);
                }
            }
        );
    });
}

exports.SelectFileByUserID = function(userID) {
    return new Promise((resolve, reject) => {
        db.query("SELECT Title, File_type FROM Files WHERE ID_user = ?", [userID], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } 
            else {
                resolve(result)
            }
        })
    })
}

exports.SelectFilePathByFileTypeAndUserID = function(userID, fileType) {
    return new Promise((resolve, reject) => {
        db.query("SELECT Title, File_path FROM Files WHERE ID_user = ? AND File_type = ?", [userID, fileType], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}
