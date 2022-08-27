const { response } = require('express');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');

const Hospital = require('../models/hospital.model');

/**
 * getHospitales
 * @param {*} req 
 * @param {*} res 
 */
const getHospitales = async(req, res) => {
    const hospitales = await Hospital.find({})
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales: hospitales,
    });
};
/**
 * addHospital
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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
        console.error(error);
        return res.status(500).json({ ok: false, msn: 'Ha surgido un fallo' });
    }
};
/**
 * updateHospital
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateHospital = async(req, res) => {
    const uid = req.params.id;
    const idUsuario = req.uid;
    try {
        const hospital = await Hospital.findById(uid);
        if (!hospital) {
            return res.status(404).json({
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
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un fallo'
        });
    }
};
/**
 * deleteHospital
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteHospital = async(req, res) => {
    const uid = req.params.id;
    try {
        const hospital = await Hospital.findById(uid);
        if (!hospital) {
            return res.status(404).json({
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
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un fallo'
        });
    }
};

module.exports = {
    getHospitales,
    addHospital,
    updateHospital,
    deleteHospital
}