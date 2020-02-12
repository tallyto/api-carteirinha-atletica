const mongoose = require('mongoose');

const parceiroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  promocao: {
    type: String,
    required: true,
  },
  img: {
    name: String,
    size: Number,
    key: String,
    url: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('parceiros', parceiroSchema);
