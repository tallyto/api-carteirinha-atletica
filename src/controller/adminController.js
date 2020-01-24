/* eslint-disable linebreak-style */
require('./../models/socio');
const { model } = require('mongoose');

const Socio = model('socios');

module.exports = {
  async index(req, res) {
    const socio = await Socio.find().sort({ name: 1 }).lean();


    res.render('admin/index', { socio });
  },
};
