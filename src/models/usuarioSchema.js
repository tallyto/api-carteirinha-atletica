/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Usuario = new Schema({
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

mongoose.model('usuarios', Usuario);
