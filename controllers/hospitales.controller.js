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
    const uid = req.params.id;
    const idUsuario = req.uid;
    try {
        const hospital = await Hospital.findById(uid);
        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        const hospitalUpd = {
            ...req.body,
            usuario: idUsuario
        }
        const hostipalUpdate = await Hospital.findByIdAndUpdate(uid, hospitalUpd, { new: true });
        res.json({
            ok: true,
            hospital: hostipalUpdate,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un fallo'
        });
    }
}

const deleteHospital = async(req, res) => {
    const uid = req.params.id;
    try {
        const hospital = await Hospital.findById(uid);
        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        const hostipalDelete = await Hospital.findByIdAndRemove(uid);
        res.json({
            ok: true,
            msg: 'Hospital eliminado',
            hospital: hostipalDelete,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un fallo'
        });
    }
}

module.exports = {
    getHospitales,
    addHospital,
    updateHospital,
    deleteHospital
}