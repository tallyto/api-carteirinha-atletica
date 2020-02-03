const aws = require('aws-sdk');
const { model } = require('mongoose');
require('./../models/socio');

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
  async indexPage(req, res) {
    const socio = await Socio.find().sort({ nome: 1 }).lean();

    res.render('socio/index', { socio, title: 'Ticket Atlética - Sócios' });
  },
  async create(req, res) {
    try {
      const {
        originalname: name, size, key, location: url = '',
      } = req.file;

      const {
        nome, cpf, matricula, curso,
      } = req.body;

      const newSocio = {
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
      res.redirect('/socio/index');
      await Socio.create(newSocio);
    } catch (error) {
      res.render('socio/create', { title: 'Ticket Atlética - Cadastrar Sócio', error_msg: 'Erro ao cadastrar novo sócio' });
    }
  },
  async remove(req, res) {
    const { id } = req.params;
    const socio = await Socio.findOneAndRemove({ _id: id });
    removeImageS3(socio.img.key);

    res.redirect('/socio/index');
  },
  async findAndUpdate(req, res) {
    const { id } = req.params;
    const socio = await Socio.findById({ _id: id }).lean();

    res.render('socio/update', { socio, title: 'Ticket Atlética - Atualizar' });
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

    res.redirect('/socio/index');
  },
  createPage(req, res) {
    res.render('socio/create', { title: 'Ticket Atlética - Cadastrar Sócio' });
  },
};
