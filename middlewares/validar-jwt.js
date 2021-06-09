const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    // Leer el token de los headers
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'el token ha expirado o no se ha registrado'
        })
    }

    try {
        const { uid } = jwt.decode(token, process.env.JWT_SECRET);
        console.log(uid);
        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }
}


module.exports = {
    validarJWT
}