/* eslint-disable linebreak-style */
require('./../models/socio');
const { model } = require('mongoose');

const Socio = model('socios');

module.exports = {
  async index(req, res) {
    const socio = await Socio.find().sort({ name: 1 }).lean();
    res.render('admin/index', { socio });
  },
  async destroy(req, res) {
    const { id } = req.params;
    await Socio.findByIdAndDelete({ _id: id });
    res.redirect('/admin');
  },
  async findUser(req, res) {
    const { id } = req.params;
    const socio = await Socio.findById({ _id: id }).lean();

    res.render('admin/update', { socio });
  },
  async update(req, res) {
    const {
      name, cpf, matricula, curso,
    } = req.body;

    const { id } = req.params;

    const socio = await Socio.findById({ _id: id });

    socio.name = name;
    socio.cpf = cpf;
    socio.matricula = matricula;
    socio.curso = curso;
    socio.save();
    res.redirect('/admin');
  },
  create(req, res) {
    res.render('admin/create');
  },
  async createUser(req, res) {
    const {
      name, cpf, matricula, curso,
    } = req.body;
    const user = {
      name, cpf, matricula, curso,
    };

    await Socio.create(user);

    res.redirect('/admin');
  },


};
