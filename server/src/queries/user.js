const e = require('express');
const db = require('../db') //Chemin vers les infos de connexion à la db

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
            //console.log("L'utilisateur existe déjà.");
            resolve(true);
          } else {
            console.log("L'utilisateur n'existe pas.");
            resolve(false);
          }
        }
      }
    );
  });
};

const getBankbyName = function(name) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT ID_bank FROM Bank WHERE Name = ?",
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


exports.userInsertInto  = function(email,encryptedPassword,username,userfirstname,type,bankname) {
  return new Promise((resolve, reject) => {
  if (type == "employee") {
    db.query(
      "INSERT INTO Users SET ?",
      {
        Email: email,
        Password: encryptedPassword,
        Name: username,
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
          console.log("resultat de la requete : ", results.insertId);
          const ID_user = results.insertId;
          getBankbyName(bankname).then((ID_bank) => {
            db.query(
              "INSERT INTO Employee SET ?",
              {
                ID_user: ID_user,
                ID_bank: ID_bank
              },
              (error, results) => {
                if (error) {
                  // Gérer les erreurs d'insertion dans la base de données
                  console.error(error);
                  reject(new Error("Une erreur s'est produite lors de l'enregistrement de l'utilisateur."));
                } else {
                  console.log(
                    "Employé inséré avec succès dans la base de données."
                  );
                  resolve(true);
                }
              }
            );
          }
          );
        }

      }
    );
  }
  else {
    db.query(
      "INSERT INTO Users SET ?",
      {
        Email: email,
        Password: encryptedPassword,
        Name: username,
        FirstName: userfirstname,
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
          console.log("resultat de la requete : ", results.insertId);
          resolve(true);
        }

      }
    );
  }
}
  )}