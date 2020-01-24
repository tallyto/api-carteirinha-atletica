/* eslint-disable linebreak-style */

const { Router } = require('express');
const socio = require('./controller/socioController');
const admin = require('./controller/adminController');


const routes = Router();

routes.get('/admin', admin.index);

routes.get('/ok', (req, res) => {
  res.render('ok', { message: 'Login efetuado com sucesso' });
});

routes.get('/', (req, res) => {
  res.render('login');
});

routes.post('/login', (req, res) => {
  res.redirect('/ok');
});

routes.post('/cadastrar/socio', socio.store);
routes.get('/listar/socio', socio.index);

module.exports = routes;
