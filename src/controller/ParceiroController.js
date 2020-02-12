
const removeImageS3 = require('./../helpers/removeImageS3');

const Parceiro = require('./../schema/parcerio');

class ParceiroController {
  async indexPage(req, res) {
    const parceiro = await Parceiro.find().sort({ nome: 1 }).lean();

    res.render('parceiro/index', { parceiro, title: 'Ticket Atlética - Parceiros' });
  }

  async create(req, res) {
    try {
      const {
        originalname: name, size, key, location: url = '',
      } = req.file;

      const {
        nome, promocao,
      } = req.body;

      const newParceiro = {
        nome,
        promocao,
        img: {
          name,
          size,
          key,
          url,
        },
      };
      await Parceiro.create(newParceiro);
      return res.redirect('/parceiro/index');
    } catch (error) {
      return res.render('parceiro/create', { title: 'Ticket Atlética - Cadastrar parceiro', error_msg: 'Erro ao cadastrar novo parceiro' });
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    const parceiro = await Parceiro.findOneAndDelete({ _id: id });

    removeImageS3(parceiro.img.key);

    return res.redirect('/parceiro/index');
  }

  async findAndUpdate(req, res) {
    const { id } = req.params;
    const parceiro = await Parceiro.findById({ _id: id }).lean();

    return res.render('parceiro/update', { parceiro, title: 'Ticket Atlética - Atualizar parceiro' });
  }

  async update(req, res) {
    const {
      nome, promocao,
    } = req.body;

    const { id } = req.params;

    const parceiro = await Parceiro.findById({ _id: id });

    parceiro.nome = nome;
    parceiro.promocao = promocao;
    await parceiro.save();

    return res.redirect('/parceiro/index');
  }

  createPage(req, res) {
    return res.render('parceiro/create', { title: 'Ticket Atlética - Cadastrar parceiro' });
  }
}

module.exports = new ParceiroController();
