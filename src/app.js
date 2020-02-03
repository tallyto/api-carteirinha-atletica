/* eslint-disable linebreak-style */
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

const usuario = require('./controller/userController');
const routes = require('./routes');

require('./config/auth')(passport);

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.engine();
    this.db();
  }

  middlewares() {
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    this.server.use(serveStatic(path.join(__dirname, 'public')));

    this.server.use(cors());

    this.server.use(flash());

    // Sessão
    this.server.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      }),
    );

    // Auth
    this.server.use(passport.initialize());
    this.server.use(passport.session());

    // Variaveis global
    this.server.use((req, res, next) => {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
    });
  }

  routes() {
    this.server.use(routes);
    this.server.use('/usuario', usuario);
  }

  engine() {
    this.server.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    this.server.set('view engine', 'handlebars');
  }

  db() {
    connect(
      'mongodb+srv://otallytodev:1233211996@cluster0-jq9ag.mongodb.net/carteirinha?retryWrites=true&w=majority',
      { useUnifiedTopology: true, useNewUrlParser: true },
    ).then(() => {
      console.log('Banco de dados conectado com sucesso!');
    }).catch(() => console.log('Erro ao conectar ao banco de dados'));
  }
}

module.exports = new App().server;
