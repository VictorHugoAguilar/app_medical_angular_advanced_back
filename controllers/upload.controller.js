const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { updateImage } = require('../helpers/updateImage');



const fileUpload = async(req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const regex = new RegExp(id, 'i');
    // Validar los tipo válidos
    tiposValidos = ['usuarios', 'medicos', 'hospitales'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: `El tipo ${tipo} no es válido`
        });
    }
    // Validar que el fichero existe
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            msg: 'No hay existe un fichero correcto'
        });
    }

    // procesar el fichero 
    const file = req.files.imagen;
    const nameSplit = file.name.split('.');
    const extensionFile = nameSplit[nameSplit.length - 1];

    // Validar la extension
    const extensionesValidas = ['png', 'jpg', 'svg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionFile)) {
        return res.status(400).json({
            ok: false,
            msg: `La extensión del fichero ${extensionFile} no es válido`
        });
    }

    const nombreFichero = `${uuidv4()}.${extensionFile}`
    const uploadPath = `./uploads/${tipo}/${nombreFichero}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                msn: 'Fallo al subir el fichero al servido'
            });

        // Actualiar BD para el tipo propio
        updateImage(tipo, id, nombreFichero)

        res.status(200).json({
            ok: true,
            msg: 'Fichero subido',
            nombreFichero
        });
    });
}

const downloadImg = (req, res = response) => {
    const tipo = req.params.tipo;
    const img = req.params.img;
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    // Check file exists
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/default/no-img.jpg`);
    }
    res.sendFile(pathImg);
}


module.exports = {
    fileUpload,
    downloadImg
}