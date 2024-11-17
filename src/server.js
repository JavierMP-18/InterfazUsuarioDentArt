// server.js (backend)
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000; // Puerto del backend

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres', // usuario
  host: 'localhost', // host de la base de datos (puedes ajustarlo si está en otro servidor)
  database: 'Consultorio_dental', // nombre de la base de datos
  password: '22300', // contraseña
  port: 5432, // puerto de PostgreSQL
});

// Habilitar CORS para permitir solicitudes de tu app móvil
app.use(cors());

// Endpoint para obtener los datos del paciente con id = 1
app.get('/paciente', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.pacientes WHERE id_paciente = 1');
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res.json(result.rows[0]); // Enviar solo el primer paciente encontrado
    } catch (err) {
      console.error('Error al obtener los datos del paciente:', err); // Más detalles del error
      res.status(500).json({ error: 'Error al consultar los datos del paciente', details: err.message });
    }
  });
  

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
