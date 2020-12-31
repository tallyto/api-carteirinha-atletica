const removeImageS3 = require('../helpers/removeImageS3');

const Socio = require('../schema/socio');

class SocioController {
  async indexPage(req, res) {
    const socio = await Socio.find().sort({ nome: 1 }).lean();

    res.render('socio/index', { socio, title: 'Ticket Atlética - Sócios' });
  }

  async create(req, res) {
    try {
      const {
        originalname: name, size, key, location: url = '',
      } = req.file;

      const {
        nome, cpf, matricula, curso,
      } = req.body;

      const exist = await Socio.findOne({ cpf });

      if (exist) {
        return res.render('socio/create', { title: 'Ticket Atlética - Cadastrar Sócio', error_msg: 'Esse CPF já consta na nossa base de dados' });
      }

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
      await Socio.create(newSocio);
      return res.redirect('/socio/index');
    } catch (error) {
      return res.render('socio/create', { title: 'Ticket Atlética - Cadastrar Sócio', error_msg: 'Erro ao cadastrar novo sócio' });
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    const socio = await Socio.findOneAndDelete({ _id: id });

    removeImageS3(socio.img.key);

    return res.redirect('/socio/index');
  }

  async findAndUpdate(req, res) {
    const { id } = req.params;
    const socio = await Socio.findById({ _id: id }).lean();

    return res.render('socio/update', { socio, title: 'Ticket Atlética - Atualizar' });
  }

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

    return res.redirect('/socio/index');
  }

  createPage(req, res) {
    return res.render('socio/create', { title: 'Ticket Atlética - Cadastrar Sócio' });
  }
}

module.exports = new SocioController();
