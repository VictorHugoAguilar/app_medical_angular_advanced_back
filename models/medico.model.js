const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'medicos' });

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Medico', MedicoSchema);