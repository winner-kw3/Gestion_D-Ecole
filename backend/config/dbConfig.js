const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db5018089052.hosting-data.io',
  user: process.env.DB_USER || 'dbu2150858',
  password: process.env.DB_PASSWORD || 'GestionEcole2025',
  database: process.env.DB_NAME || 'dbs14364186',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
