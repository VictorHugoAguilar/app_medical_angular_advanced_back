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
router.post('/', [], addHospital);
router.put('/:id', [], updateHospital);
router.delete('/:id', [], deleteHospital)

module.exports = router;