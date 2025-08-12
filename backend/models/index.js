// db.js
const mysql = require('mysql2/promise');
const config = require('../config/db.config');

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
