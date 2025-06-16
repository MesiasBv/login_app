// routes/auth.js
const express = require('express');
const { poolPromise } = require('../config/db');
const router = express.Router();

// Ruta para manejar el login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;  // Recibe los datos del formulario

    try {
        const pool = await poolPromise;  // Establece la conexión a la base de datos
        const result = await pool.request()
            .input('username', username)  // Inserta el nombre de usuario en la consulta
            .query('SELECT * FROM dbo.USUARIO WHERE LOGEO = @username AND ESTADO = 1');  // Consulta SQL

        const user = result.recordset[0];  // Obtiene el primer registro (usuario)

        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });  // Si no encuentra el usuario
        }

        // Comparar contraseñas directamente (texto plano)
        if (password !== user.CLAVE) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });  // Si las contraseñas no coinciden
        }

        // Si la validación es exitosa, responde con un mensaje y el ID del usuario
        res.json({ msg: 'Login exitoso', userId: user.IDUSUARIO });
    } catch (err) {
        console.error('Error en el login:', err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;
