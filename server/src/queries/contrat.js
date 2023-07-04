const db = require('../db');

exports.getContratByIDCONV = function (ID_conversation) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT * FROM Contrats WHERE ID_conversation = ?", [ID_conversation], (error, results) => {
            if (error) {
                return reject(new Error("Contrat not found"));
            } else {
                return resolve(results);
            }
        })
    })
}

exports.modifyContratByIDCONV = function (ID_conversation, newContrat) {
    return new Promise ((resolve, reject) => {
        db.query("UPDATE Contrats SET ? WHERE ID_conversation = ?", [newContrat, ID_conversation], (error, results) => {
            if (error) {
                console.log(error)
                return reject(new Error("Contrat not found"));
            } else {
                return resolve(results);
            }
        })
    })
}

exports.modifyStatusContratByIDCONV = function (ID_conversation, Status) {
    return new Promise ((resolve, reject) => {
        getsatusContratByIDCONV(ID_conversation).then((results) => {
            if (results[0].Status == "Pending" || results[0].Status == "Progress"){
                if (results[0].Status == "Pending" && Status == "Accepted"){
                    return reject(new Error("Contrat not in progress"))
                }
                db.query("UPDATE Contrats SET Status = ? WHERE ID_conversation = ?", [Status, ID_conversation], (error, results) => {
                    if (error) {
                        return reject(new Error("Contrat not found"));
                    } else {
                        return resolve(results);
                    }
                })
            } else if (results[0].Status == "Accepted" || results[0].Status == "Canceled"){
                return reject(new Error("Contrat already accepted or refused"));
            }


        }).catch((error) => {
            return reject(error);
        })
    })
}

getsatusContratByIDCONV = function (ID_conversation) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT Status FROM Contrats WHERE ID_conversation = ?", [ID_conversation], (error, results) => {
            if (error) {
                return reject(new Error("Contrat not found"));
            } else {
                return resolve(results);
            }
        })
    })
}