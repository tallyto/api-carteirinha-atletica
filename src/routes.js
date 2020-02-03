const { Router } = require('express');
const multer = require('multer');

const Admin = require('./controller/admin');
const Api = require('./controller/api');
const Socio = require('./controller/socio');

const multerConfig = require('./config/multerConfig');
const { eAdmin } = require('./helpers/eAdmin');

const routes = Router();

// Admin
routes.get('/admin', eAdmin, Admin.index);

// Socio
routes.get('/socio/index', eAdmin, Socio.indexPage);
routes.get('/socio/create', eAdmin, Socio.createPage);
routes.post('/socio/findAndUpdate/:id', eAdmin, Socio.findAndUpdate);
routes.post('/socio/create', eAdmin, multer(multerConfig).single('file'), Socio.create);
routes.post('/socio/update/:id', eAdmin, Socio.update);
routes.post('/socio/remove/:id', eAdmin, Socio.remove);

// Api
routes.get('/api/index', Api.index);
routes.get('/api/show', Api.show);

routes.get('/', (req, res) => {
  res.render('index', { title: 'Ticket Atlética' });
});

module.exports = routes;
