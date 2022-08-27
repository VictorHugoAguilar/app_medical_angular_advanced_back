const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.info('DB online');
    } catch (error) {
        throw new Error('No se ha podido levantar el servidor de BD');
    }
}

module.exports = {
    dbConnection: dbConnection
}