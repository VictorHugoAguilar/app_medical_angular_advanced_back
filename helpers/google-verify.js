const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_CLIENT
});

/**
 * googleVerify
 * @param {*} token 
 * @returns 
 */
const googleVerify = async(token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            //audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        const { name, email, picture } = payload;
        return { name, email, picture };
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    googleVerify
}