/* eslint-disable linebreak-style */

const { Router } = require('express');
const multer = require('multer');
const socio = require('./controller/socioController');
const admin = require('./controller/adminController');
const multerConfig = require('./config/multerConfig');
const { eAdmin } = require('./helpers/eAdmin')

const routes = Router();

routes.get("/admin", eAdmin, admin.adminPage)
routes.get('/admin/index', eAdmin, admin.index);
routes.post('/admin/destroy/:id', eAdmin, admin.destroy);
routes.post('/admin/findUser/:id', eAdmin, admin.findUser);
routes.post('/admin/update/:id', eAdmin, admin.update);
routes.get('/admin/create', eAdmin, admin.create);
routes.post(
  '/admin/create',
  multer(multerConfig).single('file'), admin.createUser);

routes.get('/', (req, res) => {
  res.render('index', {title: "Ticket Atlética"});
});


routes.get('/listar/socio', socio.index);

module.exports = routes;
