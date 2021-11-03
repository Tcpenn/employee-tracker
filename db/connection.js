// dependencies
const  mysql = require('mysql2');

//connect to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        //mysql username
        user: 'root',
        //sql password
        password: '264169Ty!',
        database: 'management'
    },
    console.log('Connected to the management database')
);

module.exports = db;