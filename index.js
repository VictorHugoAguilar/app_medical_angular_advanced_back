const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// BD
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        mgs: 'Todo Ok (^.^) '
    })
})

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ', process.env.PORT);
})