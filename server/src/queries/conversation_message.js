const db = require('../db');


exports.getConvByIDandIDuser = function(conversationId,userID,employeeID) {
    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM Conversations WHERE ID_conversation = ? AND (ID_user = ? OR ID_employee = ?)",
            [conversationId, userID, employeeID],
            (error, result) => {
              if (error) {
                console.error(error);
                reject(error);
              } else {
                if (result[0] === undefined) {
                  reject(new Error("Conversation not found"));
                } else {
                  resolve(result[0]);
                }
              }
            }
          );

    })
}

exports.getMessageByIDconv= function(conversationId) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from Messages where ID_conversation = ?", [conversationId], (error, results) => {
      if (error){
        return reject(new Error("Conversation not found"));
      }else {
        return resolve(results);
      }
    });
  })
}

exports.insertMessage = function(message,who,conversationId,ivmessage) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO Messages (Content, Sender, ID_conversation,iv) VALUES (?,?,?,?);", 
            [message,who,conversationId,ivmessage ], (error, results) => {
              if (error){
                return reject(new Error("Conversation not found"));
              }else {
                return resolve(true);
              }
            });
  })
}

exports.getConvByIDuserandIDLoan = function(userID,employeeID,loanID) { //get all conversations of a user or an employee
  return new Promise((resolve, reject) => {
    if (loanID === undefined || loanID === null || loanID === "") {
      db.query("SELECT * FROM Conversations WHERE ID_user = ? OR ID_employee = ?", [userID,employeeID], (error, results) => {
        if (error){
          return reject(new Error("Conversation not found"));
        }else {
          return resolve(results);
        }
      });
    } else {
      db.query("SELECT * FROM Conversations WHERE (ID_user = ? OR ID_employee = ?) AND ID_application = ?", [userID,employeeID,loanID], (error, results) => {
        if (error){
          return reject(new Error("Conversation not found"));
        }else {
          return resolve(results);
        }
      });
    }
  })
}

exports.createConversation = function (id_employee, title, id_user, id_application) {
  return new Promise ((resolve, reject) => {
    db.query("INSERT INTO Conversations (ID_employee, Title, ID_user, ID_application) VALUES (?,?,?,?)", [id_employee, title, id_user, id_application], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}