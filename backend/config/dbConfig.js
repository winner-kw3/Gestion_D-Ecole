const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'db5018089052.hosting-data.io',
//   user: process.env.DB_USER || 'dbu2150858',
//   password: process.env.DB_PASSWORD || 'GestionEcole2025',
//   database: process.env.DB_NAME || 'dbs14364186',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

const pool = mysql.createPool({
  host: 'https://my.ionos.fr/webhosting/bb8d4570-55c1-41aa-a7f7-c306985af344/databases/31f6f4b9-fb62-4122-8a43-a98ad3b27d15/open',
  user: 'dbu2150858',
  password: 'GestionEcole2025',
  database: 'dbs14364186',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
