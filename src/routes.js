/* eslint-disable linebreak-style */

const { Router } = require('express');
const socio = require('./controller/socioController');


const routes = Router();

routes.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

routes.get('/ok', (req, res) => {
  res.render('ok', { message: 'Login efetuado com sucesso' });
});
routes.post('/login', (req, res) => {
  res.redirect('/ok');
});

routes.post('/cadastrar/socio', socio.store);
routes.get('/listar/socio', socio.index);

module.exports = routes;
