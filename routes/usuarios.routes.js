const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
/**
 * RUTA: /api/usuarios
 */
router.get('/', [
    validarJWT
], getUsers);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], addUser);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], updateUser);
router.delete('/:id', [
    validarJWT
], deleteUser)

module.exports = router;