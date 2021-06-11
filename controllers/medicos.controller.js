const { response } = require('express');
const bcrypt = require('bcrypt');
const Medico = require('../models/medico.model');
const { generateJWT } = require('../helpers/jwt');

const getMedicos = async(req, res) => {
    const medicos = await Medico.find({})
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos: medicos,
    });
}

const addMedico = async(req, res) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msn: 'Ha surgido un fallo' });
    }
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