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
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        require: true,
        ref: 'Hospital',
        type: Schema.Types.ObjectId
    },
}, { collection: 'medicos' });

MedicoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Medico', MedicoSchema);