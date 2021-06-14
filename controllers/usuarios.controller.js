const { response } = require('express');
const bcrypt = require('bcrypt');

const { generateJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario.model');

/**
 * getUsers
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getUsers = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const perPage = Number(req.query.perPage) || 0;
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(perPage),
        Usuario.countDocuments()
    ]);
    return res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    });
};
/**
 * addUser
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addUser = async(req, res = response) => {
    const { email, nombre, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({ ok: false, msn: 'El usuario ya existe' });
        }
        const usuario = new Usuario(req.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        const token = await generateJWT(usuario.id);
        return res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: 'Error inesperado en la carga de usuario' });
    }
};
/**
 * updateUser
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const existeUsuario = await Usuario.findById(uid);
        if (!existeUsuario) {
            return res.status(400).json({ ok: false, msn: 'El usuario no existe con ese usuario' });
        }
        // Validar token y si es el usuario correcto
        const { password, google, email, ...campos } = req.body;
        if (existeUsuario.email !== email) {
            // Validar si existe algun usuario con ese email
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({ ok: false, msn: 'El usuario ya existe' });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        return res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado en la actualizacion del usuario' });
    }
};
/**
 * deleteUser
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const existeUsuario = await Usuario.findById(uid);
        if (!existeUsuario) {
            return res.status(400).json({ ok: false, msg: 'El usuario no existe' });
        }
        // Validar token y si es el usuario correcto
        const usuarioEliminado = await Usuario.findByIdAndDelete(uid);
        return res.json({
            ok: true,
            usuario: usuarioEliminado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: 'Error inesperado en la actualizacion del usuario' });
    }
};

module.exports = { getUsers, addUser, updateUser, deleteUser }