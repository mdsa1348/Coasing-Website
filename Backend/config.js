// config.js

const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luminus'
};





const connection = mysql.createConnection(dbConfig);

module.exports = connection;
