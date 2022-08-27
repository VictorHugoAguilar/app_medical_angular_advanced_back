const jwt = require('jsonwebtoken');

/**
 * generateJWT
 * @param {*} uid 
 * @returns 
 */
const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '480h',
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateJWT
}