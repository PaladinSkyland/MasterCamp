const db = require('../db')

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