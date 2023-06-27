const db = require('../db');
const employeequeries = require('../queries/employee');


exports.getConvByIDandIDuser = function(conversationId,userID) {
    return new Promise((resolve, reject) => {
      
      
      employeequeries.getEmployeeIDByUserID(userID).then((result) => {
        if (result) {
          employeeID = result.ID_employee;
        }
      }).catch((error) => {
        console.error(error);
        reject(error);
      });

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

exports.insertMessage = function(message,who,conversationId) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO Messages (Description, Sender, ID_conversation) VALUES (?,?,?);", 
            [message,who,conversationId ], (error, results) => {
              if (error){
                return reject(new Error("Conversation not found"));
              }else {
                return resolve(true);
              }
            });
  })
}