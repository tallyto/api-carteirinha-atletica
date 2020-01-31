/* eslint-disable linebreak-style */

require('./../models/socio');
const aws = require('aws-sdk');


const { model } = require('mongoose');

const Socio = model('socios');

const s3 = new aws.S3(
  {
    accessKeyId: 'AKIAVHKUOQJ4I5J4CANF',
    secretAccessKey: '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',
    region: 'sa-east-1',
  },
);


function removeImageS3(key) {
  s3.deleteObject({
    Bucket: 'carteirinha-atletica',
    Key: key,
  });
}

module.exports = {

  async createUser(req, res) {
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;

    const {
      nome, cpf, matricula, curso,
    } = req.body;

    const newUser = {
      nome,
      cpf,
      matricula,
      curso,
      img: {
        name,
        size,
        key,
        url,
      },
    };

    await Socio.create(newUser);

    res.redirect('/admin/index');
  },
  async index(req, res) {
    const socio = await Socio.find().sort({ nome: 1 }).lean();

    res.render('admin/index', { socio });
  },
  async destroy(req, res) {
    const { id } = req.params;
    const socio = await Socio.findOneAndRemove({ _id: id });
    removeImageS3(socio.img.key);

    res.redirect('/admin/index');
  },
  async findUser(req, res) {
    const { id } = req.params;
    const socio = await Socio.findById({ _id: id }).lean();

    res.render('admin/update', { socio });
  },
  async update(req, res) {
    const {
      nome, cpf, matricula, curso, isValid,
    } = req.body;

    const { id } = req.params;

    const socio = await Socio.findById({ _id: id });

    socio.nome = nome;
    socio.cpf = cpf;
    socio.matricula = matricula;
    socio.curso = curso;
    socio.isValid = isValid;
    await socio.save();

    res.redirect('/admin/index');
  },
  create(req, res) {
    res.render('admin/create');
  },
  adminPage(req, res) {
    res.render('admin/admin');
  },
};
