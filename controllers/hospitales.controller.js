const { response } = require('express');
const bcrypt = require('bcrypt');
const Hospital = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt');

const getHospitales = async(req, res) => {
    const hospitales = await Hospital.find({})
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales: hospitales,
    });
}

const addHospital = async(req, res) => {
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msn: 'Ha surgido un fallo' });
    }
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