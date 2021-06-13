const fs = require('fs');

const Medico = require('../models/medico.model');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');

const updateImage = async(tipo, id, nombreFichero) => {

    let data = [];
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe médico con ese ID');
                return false;
            }
            // Verificamos si existe un fichero ya almacenado si es así lo eliminamos
            checkOldFile(tipo, usuario.img);
            // Seteamos la nueva imagen
            usuario.img = nombreFichero;
            await usuario.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No existe hospital con ese ID');
                return false;
            }
            // Verificamos si existe un fichero ya almacenado si es así lo eliminamos
            checkOldFile(tipo, hospital.img);
            // Seteamos la nueva imagen
            hospital.img = nombreFichero;
            await hospital.save();
            return true;
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe médico con ese ID');
                return false;
            }
            // Verificamos si existe un fichero ya almacenado si es así lo eliminamos
            checkOldFile(tipo, medico.img);
            // Seteamos la nueva imagen
            medico.img = nombreFichero;
            await medico.save();
            return true;
        default:
            return res.status(400).json({
                ok: 'false',
                msg: 'La tabla de busquedas tienen que existir'
            });
    }

}

const checkOldFile = (tipo, nombreFichero) => {
    const pathOld = `./uploads/${tipo}/${nombreFichero}`;
    if (fs.existsSync(pathOld)) {
        // Elimina la imagen anterior;
        fs.unlinkSync(pathOld);
    }
}




module.exports = { updateImage };