const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
    nombre: { type: String , required: true },
    apellido: { type: String , required: true },
    telefonoDestino: { type: Number, required: true },
    telefonoEmisor: { type: Number, required: true },
    textoMensaje: { type: String , required: true}
});

module.exports = mongoose.model("Sms", smsSchema);