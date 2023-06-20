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
              reject(new Error("Bank not found"));
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

