const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eAdmin: {
    type: Number,
    default: 1,
  },
  senha: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('usuarios', UsuarioSchema);
