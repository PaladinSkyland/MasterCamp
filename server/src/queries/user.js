const db = require('../db') //Chemin vers les infos de connexion à la db

exports.getNameByID = function(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT Name from Users where ID_user = ?", [id], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          if (result[0] === undefined) {
            reject(new Error("User not found"));
          } else {
            resolve(result[0]);
          }
        }
      });
    });
  };
  