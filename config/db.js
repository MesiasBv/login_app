// config/db.js
const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,  // Si es necesario
        trustServerCertificate: true,  // Evita problemas con certificados no verificados
        connectionTimeout: 30000,  // Aumenta el tiempo de espera a 30 segundos
        requestTimeout: 30000
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conexión a la base de datos exitosa');
        return pool;
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });

module.exports = {
    sql,
    poolPromise
};
