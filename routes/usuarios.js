const { Router } = require('express');
const { getUsuarios, addUsuarios } = require('../controllers/usuarios');


const router = Router();

/**
 * RUTA: /api/usuarios
 */


router.get('/', getUsuarios)
router.post('/', addUsuarios)


module.exports = router;