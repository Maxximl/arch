const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'agro-base',
    password: 'hdx123'
})

module.exports = pool.promise();