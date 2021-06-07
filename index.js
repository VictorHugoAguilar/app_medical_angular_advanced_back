require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Corsx
app.use(cors())

// BD
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'))


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ', process.env.PORT);
})