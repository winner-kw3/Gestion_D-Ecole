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

// const pool = mysql.createPool({
//   host: 'planifia-6903f:us-central1:bdd',
//   user: 'root',
//   password: 'UHp8qe@z9gI&/k>X',
//   database: 'bdd',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

module.exports = pool.promise();
// const mysql = require('mysql2');

// // Connexion directe à l'IP publique de ton instance Cloud SQL
// const pool = mysql.createPool({
//   host: '34.61.103.16',
//   user: 'winner',
//   password: 'winner',
//   database: 'bdd',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool.promise();
