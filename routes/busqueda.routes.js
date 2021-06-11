const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const { search } = require('../controllers/busqueda.controller');


const router = Router();
/**
 * api/busqueda/:busqueda
 */
router.get('/:busqueda', [validarJWT], search);

module.exports = router;