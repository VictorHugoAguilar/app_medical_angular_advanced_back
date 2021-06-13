const { response } = require('express');

const Medico = require('../models/medico.model');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');

const search = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const searchSpecific = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuarios', 'nombre img');
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuarios', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: 'false',
                msg: 'La tabla de busquedas tienen que existir'
            });
            break;
    }

    res.json({
        ok: true,
        resultado: data
    });
}

module.exports = {
    search,
    searchSpecific
}