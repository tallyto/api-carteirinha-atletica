const { Router } = require('express');
const multer = require('multer');

const Admin = require('./controller/AdminController');
const ApiSocio = require('./controller/ApiSocioController');
const Socio = require('./controller/SocioController');
const Usuario = require('./controller/UsuarioController');
const Parceiro = require('./controller/ParceiroController');
const ApiParceiro = require('./controller/ApiParceiroController');

const multerConfig = require('./config/multerConfig');
const { eAdmin } = require('./helpers/eAdmin');

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Ticket Atlética' });
});

// Api
routes.get('/api/socio/show', ApiSocio.show);
routes.get('/api/parceiro/index', ApiParceiro.index);

// Usuário
routes.get('/usuario/cadastro', Usuario.cadastro);
routes.get('/usuario/login', Usuario.loginPage);
routes.post('/usuario/registro', Usuario.registro);
routes.post('/usuario/login', Usuario.login);
routes.get('/usuario/logout', Usuario.logout);

// Rotas protegitas por login
routes.use(eAdmin);

// Admin
routes.get('/admin', Admin.index);

// Socio
routes.get('/socio/index', Socio.indexPage);
routes.get('/socio/create', Socio.createPage);
routes.post('/socio/create', multer(multerConfig).single('file'), Socio.create);
routes.post('/socio/findAndUpdate/:id', Socio.findAndUpdate);
routes.post('/socio/update/:id', Socio.update);
routes.post('/socio/remove/:id', Socio.remove);

// Parceiro
routes.get('/parceiro/index', Parceiro.indexPage);
routes.get('/parceiro/create', Parceiro.createPage);
routes.post('/parceiro/create', multer(multerConfig).single('file'), Parceiro.create);
routes.post('/parceiro/findAndUpdate/:id', Parceiro.findAndUpdate);
routes.post('/parceiro/update/:id', Parceiro.update);
routes.post('/parceiro/remove/:id', Parceiro.remove);

module.exports = routes;
