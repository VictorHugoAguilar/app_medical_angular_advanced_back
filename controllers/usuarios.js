const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const getUsers = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios: usuarios
    });
}

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

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado en la carga de usuario' });
    }
}

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

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado en la actualizacion del usuario' });
    }
}


const deleteUser = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const existeUsuario = await Usuario.findById(uid);

        if (!existeUsuario) {
            return res.status(400).json({ ok: false, msg: 'El usuario no existe' });
        }

        // Validar token y si es el usuario correcto

        const usuarioEliminado = await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            usuario: usuarioEliminado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado en la actualizacion del usuario' });
    }
}


module.exports = { getUsers, addUser, updateUser, deleteUser }