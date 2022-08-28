const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

/**
 * validarJWT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validarJWT = (req, res, next) => {
    // Leer el token de los headers
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'el token ha expirado o no se ha registrado'
        })
    }
    try {
        const { uid } = jwt.decode(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }
};

const validarAdminRole = async (req, res, next) => {
    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existente'
            })
        }
        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para esta acción'
            })
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'No contine el role administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdminRole
}