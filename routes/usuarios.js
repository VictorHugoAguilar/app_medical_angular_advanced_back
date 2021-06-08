const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/**
 * RUTA: /api/usuarios
 */

router.get('/', getUsers);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
], addUser);
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], updateUser);
router.delete('/:id', deleteUser)

module.exports = router;