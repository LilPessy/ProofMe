const mysql = require('mysql2');

// Configura qui i tuoi dati di accesso
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Il tuo utente MySQL (es. root)
  password: '',      // La tua password (spesso vuota su XAMPP o 'root' su MAMP)
  database: 'proofme',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify per usare async/await
const promisePool = pool.promise();

module.exports = promisePool;