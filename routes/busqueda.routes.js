const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const { search, searchSpecific } = require('../controllers/busqueda.controller');


const router = Router();
/**
 * api/busqueda
 */
router.get('/:busqueda', [validarJWT], search);
router.get('/:tabla/:busqueda', [validarJWT], searchSpecific);


module.exports = router;