const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login, googleSignIn, refreshToken } = require('../controllers/auth.controller');

const router = Router();
/**
 * Rutas: /api/login
 */
router.get('/', [
    validarJWT
], refreshToken);
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);
router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;