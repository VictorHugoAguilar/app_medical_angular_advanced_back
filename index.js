require('dotenv').config();

const express = require('express');
const cors = require('cors')


const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Cors
app.use(cors())

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