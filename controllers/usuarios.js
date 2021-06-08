const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios: usuarios
    })
}

const addUsuarios = async(req, res) => {
    const { email, nombre, password } = req.body;
    const usuario = new Usuario(req.body);

    await usuario.save();

    res.json({
        ok: true,
        usuario: usuario
    })
}


module.exports = { getUsuarios, addUsuarios }