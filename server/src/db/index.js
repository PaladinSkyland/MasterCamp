const knex = require('knex')({
    client: process.env.MYSQL_CLIENT,
    connection:{
        host:process.env.MYSQL_HOST,
        database:process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    }
})

module.exports = knex;