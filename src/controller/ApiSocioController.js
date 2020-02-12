const Socio = require('./../schema/socio');

class ApiSocioController {
  async show(req, res) {
    try {
      const { cpf } = req.query;
      const socio = await Socio.findOne({ cpf });
      return res.json(socio);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new ApiSocioController();
