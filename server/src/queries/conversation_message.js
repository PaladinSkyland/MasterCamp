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
        const id_conversation = result.insertId
        //take de application and copy it in the new contract
        db.query("SELECT * FROM LoanApplications WHERE ID_application = ?", [id_application], (error, result) => {
          if (error){
            reject(error)
          } else {
            db.query("INSERT INTO Contrats (ID_conversation, Amount, InterestRate, Duration, InterestType, MonthlyIncome, RepaymentOptions, Description, ID_bank, Creation_date) VALUES (?,?,?,?,?,?,?,?,?,?)", 
            [id_conversation, result[0].Amount, result[0].InterestRate, result[0].Duration, result[0].InterestType, result[0].MonthlyIncome, result[0].RepaymentOptions, result[0].Description, result[0].ID_bank, result[0].Creation_date], (error, result) => {
              if (error) {
                console.log(error)
                reject(error)
              } else {
                resolve(result)
              }

            })
          }
        })
        resolve(result)
      }
    })
  })
}

exports.getMyDoc = function (id_user) {
  return new Promise ((resolve, reject) => {
    db.query("SELECT * FROM Files WHERE ID_user = ?", [id_user], (error, result) => {
      if (error) {
        reject(error)
      } else {
        console.log(result, "result")
        resolve(result)
      }
    })
  })
}

exports.deleteFC = function (id_file, id_conv) {
  return new Promise ((resolve, reject) => {
    db.query("DELETE FROM Files_Conversations WHERE ID_file = ? AND ID_conversation = ?", [id_file, id_conv], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

exports.createFC = function (id_file, id_conv) {
  return new Promise ((resolve, reject) => {
    db.query("INSERT INTO Files_Conversations VALUES (?,?)", [id_file, id_conv], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

exports.getVisibleDoc = function (id_conv) {
  return new Promise ((resolve, reject) => {
    db.query("SELECT Files.* FROM Files_Conversations JOIN Conversations using(ID_conversation) JOIN Files using (ID_file) WHERE ID_conversation = ?", [id_conv], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

exports.getCustomerID = function (id_conv) {
  return new Promise ((resolve, reject) => {
    db.query("SELECT ID_user FROM Conversations where ID_conversation = ?", [id_conv], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}