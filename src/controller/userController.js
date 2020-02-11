/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */

// Express
const express = require('express');
const Yup = require('yup');

const Router = express.Router();

// Mongo db

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');


require('./../models/usuarioSchema');

const Usuario = mongoose.model('usuarios');


Router.get('/cadastro', (req, res) => {
  res.render('user/create', { title: 'Ticket Atlética - Cadastrar Admin' });
});

Router.post('/registro', async (req, res) => {
  const schema = Yup.object().shape({
    nome: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    senha: Yup.string().min(4).required(),
    senha2: Yup.string().oneOf([Yup.ref('senha'), null]),
  });

  if (await schema.isValid(req.body)) {
    Usuario.findOne({
      email: req.body.email,
    })
      .then((usuario) => {
        if (usuario) {
          req.flash(
            'error_msg',
            'O email informado já possui cadastro no site',
          );
          res.redirect('/usuario/cadastro');
        } else {
          const novoUsuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
          });

          bcrypt.genSalt(10, (erro, salt) => {
            bcrypt.hash(novoUsuario.senha, salt, async (erro, hash) => {
              if (erro) {
                req.flash('error_msg', 'Erro ao cadastrar usuário');
                res.redirect('/usuario/cadastro');
              }

              novoUsuario.senha = hash;

              await novoUsuario
                .save()
                .then(() => {
                  req.flash('success_msg', 'Usuário cadastrado com sucesso');
                  res.redirect('/');
                })
                .catch((erro) => {
                  req.flash(
                    'error_msg',
                    'Houve um erro ao criar o usuário, tente novamente',
                  );
                  res.redirect('/usuario/registro');
                });
            });
          });
        }
      })
      .catch((err) => {
        req.flash('error_msg', 'Houve um erro ao cadastrar o usuário');
        res.redirect('/');
      });
  } else {
    const erros = [];
    erros.push({ texto: 'Dados invalidos' });
    res.render('user/create', {
      erros, title: 'Ticket Atlética - Cadastrar Usuário',
    });
  }
});

Router.get('/login', (req, res) => {
  res.render('login', { title: 'Ticket Atlética - Entrar' });
});

Router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin/',
    failureRedirect: '/usuario/login',
    failureFlash: true,
  })(req, res, next);
});

Router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = Router;
