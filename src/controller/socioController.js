/* eslint-disable linebreak-style */
require('./../models/socio');
const { model } = require('mongoose');

const Socio = model('socios');

module.exports = {
  async store(req, res) {
    try {
      const {
        name, matricula, curso, cpf,
      } = req.body;
      const exist = await Socio.find({ cpf });

      if (exist) {
        return res.json(exist);
      }

      const socio = await Socio.create({
        name,
        matricula,
        cpf,
        curso,
      });

      return res.json(socio);
    } catch (error) {
      return res.json(error);
    }
  },
  async index(req, res) {
    try {
      const { cpf } = req.query;
      const socio = await Socio.find({ cpf });
      return res.json(socio);
    } catch (error) {
      return res.json(error);
    }
  },
};
