/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const { connect } = require('mongoose');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors');
const routes = require('./routes');
require('./config/auth')(passport);
const usuario = require('./controller/userController');

const server = express();

server.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(serveStatic(path.join(__dirname, 'public')));
server.use(flash());

// Auth
server.use(passport.initialize());
server.use(passport.session());

server.use(cors());

// Variaveis global
server.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

server.engine('handlebars', handlebars({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');

connect(
  'mongodb+srv://otallytodev:1233211996@cluster0-jq9ag.mongodb.net/carteirinha?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true },
).then(() => {
    console.log('Banco de dados conectado com sucesso!');
  }).catch(() => console.log('Erro ao conectar ao banco de dados'));

server.use(routes);
server.use('/usuario', usuario);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server in http://localhost:${PORT}`);
});