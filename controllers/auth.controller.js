const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');

const login = async(req, res) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({ ok: false, msg: 'El usuario no es válido' });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, msg: 'El usuario no es válido' });
        }

        // Generar el token
        return res.status(200).json({
            ok: true,
            token: 'token'
        })

    } catch (error) {
        console.error(error);
    }
}


module.exports = { login }