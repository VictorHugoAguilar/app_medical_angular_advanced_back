const { response } = require('express');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');

const Medico = require('../models/medico.model');

/**
 * getMedicos
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getMedicos = async(req, res) => {
    const medicos = await Medico.find({})
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');
    return res.json({
        ok: true,
        medicos: medicos,
    });
};
/**
 * addMedico
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addMedico = async(req, res) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        return res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msn: 'Ha surgido un fallo' });
    }
};
/**
 * updateMedico
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateMedico = async(req, res) => {
    const uid = req.params.id;
    const idUsuario = req.uid;
    try {
        const medico = await Medico.findById(uid);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }
        const medicoUpd = {
            ...req.body,
            usuario: idUsuario
        }
        const medicolUpdate = await Medico.findByIdAndUpdate(uid, medicoUpd, { new: true });
        return res.json({
            ok: true,
            hospital: medicolUpdate,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un fallo',
            error
        });
    }
};
/**
 * deleteMedico
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteMedico = async(req, res) => {
    const uid = req.params.id;
    try {
        const medico = await Medico.findById(uid);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }
        const medicoDelete = await Medico.findByIdAndRemove(uid);
        return res.json({
            ok: true,
            msg: 'Medico eliminado',
            medico: medicoDelete,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un fallo',
            error
        });
    }
};

module.exports = {
    getMedicos,
    addMedico,
    updateMedico,
    deleteMedico
}