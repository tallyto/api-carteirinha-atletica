/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose');

const SocioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    matricula: {
      type: String,
      required: true,
    },
    curso: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true,
    },
    img: {
      name: String,
      size: Number,
      key: String,
      url: String,
    },
  },
  { timestamps: true },
);

module.exports = model('socios', SocioSchema);