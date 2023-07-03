const db = require('../db'); //Chemin vers les infos de connexion à la db
const bankQueries = require('./bank');

exports.getUserInfoByID = function(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from Users where ID_user = ?", [id], (error, result) => {
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


exports.userAlreadyExists = function(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT Email FROM Users WHERE Email = ?",
      [email],
      (error, results) => {
        if (error) {
          // Gérer les erreurs qui se produisent lors de l'exécution de la requête ou d'autres opérations asynchrones
          console.error(error);
          reject(new Error("Connection to DB failed"));
        } else {
          // Utiliser les résultats de la requête
          if (results.length > 0) {
            // L'utilisateur existe déjà, renvoyer une réponse d'erreur
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};



exports.userInsertInto  = function(email,encryptedPassword,username,userfirstname,type,bankname) {
  return new Promise((resolve, reject) => {
  if (type == "employee") {
    bankQueries.getBankVerifiedByName(bankname).then((ID_bank) => {
    db.query(
      "INSERT INTO Users SET ?",
      {
        Email: email,
        Password: encryptedPassword,
        LastName: username,
        FirstName: userfirstname,
        UserType: type
      },
      (error, results) => {
        if (error) {
          // Gérer les erreurs d'insertion dans la base de données
          console.error(error);
          reject(new Error("Une erreur s'est produite lors de l'enregistrement de l'utilisateur."));
        } else {
          console.log(
            "Utilisateur inséré avec succès dans la base de données."
          );
          const ID_user = results.insertId;
            db.query(
              "INSERT INTO Employees SET ?",
              {
                ID_user: ID_user,
                ID_bank: ID_bank
              },
              (error, results) => {
                if (error) {
                  // Gérer les erreurs d'insertion dans la base de données
                  console.log(error);
                  reject(new Error("Une erreur s'est produite lors de l'enregistrement de l'employé."));
                } else {
                  resolve(true);
                }
              }
            );
          
        }

      }
    );
    }).catch((error) => {
      reject(error);
    });
  }
  else {
    db.query(
      "INSERT INTO Users SET ?",
      {
        Email: email,
        Password: encryptedPassword,
        LastName: username,
        FirstName: userfirstname,
      },
      (error, results) => {
        if (error) {
          // Gérer les erreurs d'insertion dans la base de données
          console.error(error);
          reject(new Error("Une erreur s'est produite lors de l'enregistrement de l'utilisateur."));
        } else {
          console.log("Utilisateur inséré avec succès dans la base de données.");
          resolve(true);
        }

      }
    );
  }
}
  )}

exports.getUserID = function() {
  return new Promise ((resolve, reject) => {
    db.query("SELECT ID_user from Users where ID_user = ?", [id], (error, result) => {
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
  })
}

exports.getLastNameByID = function (id) {
  return new Promise ((resolve, reject) => {
    db.query("SELECT LastName FROM Users WHERE ID_user = ?", [id] , (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
