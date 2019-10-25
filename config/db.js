const mysql = require('mysql')
const config = require('./configs')

const connection = mysql.createConnection(config.database.mysql)

module.exports = connection
