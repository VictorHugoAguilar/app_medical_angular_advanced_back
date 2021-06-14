const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, addHospital, updateHospital, deleteHospital } = require('../controllers/hospitales.controller');

const router = Router();
/**
 * Rutas: /api/hospitales
 */
router.get('/', [], getHospitales);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], addHospital);
router.put('/:id', [
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarJWT
], updateHospital);
router.delete('/:id', [
    validarJWT
], deleteHospital)

module.exports = router;