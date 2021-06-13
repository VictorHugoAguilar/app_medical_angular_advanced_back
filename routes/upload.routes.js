const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, downloadImg } = require('../controllers/upload.controller');


const router = Router();
router.use(expressFileUpload());

/**
 * api/upload
 */
router.put('/:tipo/:id', [validarJWT], fileUpload);
router.get('/:tipo/:img', [validarJWT], downloadImg);


module.exports = router;