/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose');

const SocioSchema = new Schema(
  {
    name: {
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
  },
  { timestamps: true },
);

module.exports = model('socios', SocioSchema);
