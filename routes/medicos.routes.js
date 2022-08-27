const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, addMedico, updateMedico, deleteMedico, getMedico } = require('../controllers/medicos.controller');

const router = Router();
/**
 * Rutas: /api/medicos
 */
router.get('/', [
    validarJWT
], getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital tiene que ser válido').isMongoId(),
    validarCampos
], addMedico);
router.put('/:id', [
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital tiene que ser válido').isMongoId(),
    validarJWT
], updateMedico);
router.delete('/:id', [
    validarJWT
], deleteMedico);
router.get('/:id', [
    validarJWT
],
    getMedico
);


module.exports = router;