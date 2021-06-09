const { response } = require('express');
const bcrypt = require('bcrypt');
const Hospital = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt');



const getHospitales = async(req, res) => {
    const hospitales = await Hospital.find({});

    res.json({
        ok: true,
        hospitales: hospitales,
    });
}

const addHospital = async(req, res) => {
    const hospitales = await Hospital.find({});

    res.json({
        ok: true,
        hospitales: hospitales,
    });
}

const updateHospital = async(req, res) => {
    const hospitales = await Hospital.find({});

    res.json({
        ok: true,
        hospitales: hospitales,
    });
}

const deleteHospital = async(req, res) => {
    const hospitales = await Hospital.find({});

    res.json({
        ok: true,
        hospitales: hospitales,
    });
}

module.exports = {
    getHospitales,
    addHospital,
    updateHospital,
    deleteHospital
}