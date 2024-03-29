require('dotenv').config();
const path = require('path');

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

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitales', require('./routes/hostpitales.routes'))
app.use('/api/medicos', require('./routes/medicos.routes'))
app.use('/api/busqueda', require('./routes/busqueda.routes'))
app.use('/api/upload', require('./routes/upload.routes'))

// Si no es ninguna
app.get('*', (req, res) => {
    res.sendFile( __dirname, 'public/index.html');
});

app.listen(process.env.PORT, () => {
    console.info('servidor corriendo en puerto ', process.env.PORT);
})