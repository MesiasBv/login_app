// routes/user.js
const express = require('express');
const { poolPromise } = require('../config/db');  // Usamos la conexión a la base de datos
const router = express.Router();

// Ruta para obtener los usuarios
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;  // Establece la conexión a la base de datos
        const result = await pool.request()
            .query('SELECT IDUSUARIO, LOGEO, IDTIPO_USUARIO, ESTADO FROM dbo.USUARIO WHERE ESTADO = 1');  // Obtener usuarios activos

        const users = result.recordset;  // Obtiene todos los usuarios
        res.json(users);  // Responde con los usuarios en formato JSON
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;
