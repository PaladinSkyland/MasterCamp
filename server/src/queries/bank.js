const db = require('../db');

exports.getBankVerifiedByName = function(name) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT ID_bank FROM Banks WHERE Name = ? AND status = 'Accepted'",
        [name],
        (error, results) => {
          if (error) {
            // Gérer les erreurs qui se produisent lors de l'exécution de la requête ou d'autres opérations asynchrones
            console.error(error);
            reject(new Error("Connection to DB failed"));
          } else {
            // Utiliser les résultats de la requête
            if (results.length > 0) {
              // La banque est existante
              resolve(results[0].ID_bank);
            }
            else{
              reject(error);
            }
          }
        }
      );
    });
  };
  
exports.getBankNames = function() {
    return new Promise((resolve, reject) => {
        db.query("SELECT Name FROM Banks WHERE status = 'Accepted'", (error, results) => {
          if (error) {
            console.log(error);
            reject(new Error("Connection to DB failed"));
          } else {
            resolve(results);
          }
        });
    });
}

exports.getBankPending = function() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Banks where status = 'Pending'", (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.updateBankStatus = function (id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE Banks set Status = 'Accepted' where ID_bank = ?", [id],(error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.deleteBankByID = function (id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE from Banks where ID_bank = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.getBankAccepted = function() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Banks where status = 'Accepted'", (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}
