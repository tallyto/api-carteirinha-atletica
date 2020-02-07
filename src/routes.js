const { Router } = require('express');
const multer = require('multer');

const Admin = require('./controller/admin');
const Api = require('./controller/api');
const Socio = require('./controller/socio');

const multerConfig = require('./config/multerConfig');
const { eAdmin } = require('./helpers/eAdmin');

const routes = Router();

// Api
routes.get('/api/index', Api.index);
routes.get('/api/show', Api.show);

routes.get('/', (req, res) => {
  res.render('index', { title: 'Ticket Atlética' });
});

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


module.exports = routes;
