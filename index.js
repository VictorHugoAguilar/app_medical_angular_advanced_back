require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Corsx
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// BD
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ', process.env.PORT);
})