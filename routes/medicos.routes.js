const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, addMedico, updateMedico, deleteMedico } = require('../controllers/medicos.controller');

const router = Router();
/**
 * Rutas: /api/medicos
 */
router.get('/', [], getMedicos);
router.post('/', [], addMedico);
router.put('/:id', [], updateMedico);
router.delete('/:id', [], deleteMedico)

module.exports = router;