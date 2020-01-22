/* eslint-disable linebreak-style */

const { Router } = require('express');
const socio = require('./controller/socioController');


const routes = Router();

routes.post('/cadastrar/socio', socio.store);
routes.get('/listar/socio', socio.index);

module.exports = routes;
