const Parceiro = require('../schema/parcerio');

class ApiParceiroController {
  async index(req, res) {
    try {
      const parceiro = await Parceiro.find();
      return res.json(parceiro);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new ApiParceiroController();
