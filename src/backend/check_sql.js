const sql = require('mssql');
require('dotenv').config();

const server = process.env.DB_SERVER || process.argv[2] || 'localhost';
const database = process.env.DB_DATABASE || process.argv[3] || 'Travel_Co_DB';
const user = process.env.DB_USER_ID || process.argv[4] || 'sa';
const password = process.env.DB_PASSWORD || process.argv[5] || 'YourPassword123!';

const config = {
  server,
  database,
  authentication: {
    type: 'default',
    options: {
      userName: user,
      password: password
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

(async () => {
  try {
    console.log('Testing SQL Server connection with:');
    console.log({ server, database, user });
    const pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server successfully');
    const result = await pool.request().query('SELECT TOP 1 name FROM sys.tables');
    console.log('Sample query result:', result.recordset);
    await pool.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection failed:');
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
})();
