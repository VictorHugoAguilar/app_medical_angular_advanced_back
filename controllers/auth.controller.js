const { response } = require('express');
const bcrypt = require('bcrypt');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario = require('../models/usuario.model');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

/**
 * login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async(req, res = response) => {
    const { email, password } = req.body;
    // Controlamos los fallos
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
        const token = await generateJWT(usuarioDB.id);
        // Retornamos la respuesta
        return res.status(200).json({
            ok: true,
            token: token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })
    } catch (error) {
        console.error(error);
    }
};
/**
 * googleSignIn
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    // Controlamos los fallos
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        // Buscamos en la BD si existe
        const usuarioDb = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDb) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '###',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDb;
            usuario.google = true;
        }
        // salvar en BD
        usuario.save();
        // Generar el token
        const token = await generateJWT(usuario.id);
        // Retornamos la respuesta
        return res.status(200).json({
            ok: true,
            msg: 'Google signIn',
            token,
            menu: getMenuFrontEnd(usuario.role)
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
            error
        })
    }
};
/**
 * refreshToken
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const refreshToken = async(req, res = response) => {
    const uid = req.uid;
    // Generar el token
    const token = await generateJWT(uid);
    
    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    if(!usuario){
        return res.status(500).json({
            ok: false,
            msn: 'Not found user'
        })
    }

    // enviar la respuesta
    return res.status(200).json({
        ok: true,
        token,
        usuario,
        uid,
        menu: getMenuFrontEnd(usuario.role)
    });
};

module.exports = { login, googleSignIn, refreshToken }