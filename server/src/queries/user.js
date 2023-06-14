const db = require('../db') //Chemin vers les infos de connexion à la db

exports.getNameByID =  async (ID) => {
    const request = await db.select("Nom_utilsateur").from("utilisateur").where({ID_user: ID})
    console.log(request[0])
    if(request.length > 0){
        return {
            name: request[0].Nom_utilsateur
        }
    }
}