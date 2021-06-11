const { response } = require('express');
const bcrypt = require('bcrypt');
const Medico = require('../models/medico.model');
const { generateJWT } = require('../helpers/jwt');

const search = async(req, res) => {

    const busqueda = req.params.busqueda;

    res.json({
        ok: true,
        busqueda
    });
}


module.exports = {
    search
}