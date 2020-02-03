require('./../models/socio');

const { model } = require('mongoose');

const Socio = model('socios');

module.exports = {
  async index(req, res) {
    try {
      const { cpf } = req.query;
      const socio = await Socio.findOne({ cpf });
      return res.json(socio);
    } catch (error) {
      return res.json(error);
    }
  },
  async show(req, res) {
    try {
      const socio = await Socio.find();
      return res.json(socio);
    } catch (error) {
      return res.json(error);
    }
  },
};
