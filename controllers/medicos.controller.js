const { response } = require('express');
const bcrypt = require('bcrypt');
const Medico = require('../models/medico.model');
const { generateJWT } = require('../helpers/jwt');

const getMedicos = async(req, res) => {
    const medicos = await Medico.find({});

    res.json({
        ok: true,
        medicos: medicos,
    });
}

const addMedico = async(req, res) => {
    const medicos = await Medico.find({});

    res.json({
        ok: true,
        medicos: medicos,
    });
}

const updateMedico = async(req, res) => {
    const medicos = await Medico.find({});

    res.json({
        ok: true,
        medicos: medicos,
    });
}

const deleteMedico = async(req, res) => {
    const medicos = await Medico.find({});

    res.json({
        ok: true,
        medicos: medicos,
    });
}

module.exports = {
    getMedicos,
    addMedico,
    updateMedico,
    deleteMedico
}