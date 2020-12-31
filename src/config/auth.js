const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Usuario = require('../schema/usuario');

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: 'email', passwordField: 'senha' },
      (email, senha, done) => {
        Usuario.findOne({ email }).then((usuario) => {
          if (!usuario) {
            return done(null, false, { message: 'Esta conta não existe' });
          }

          bcrypt.compare(senha, usuario.senha, (erro, batem) => {
            if (batem) {
              return done(null, usuario);
            }
            return done(null, false, { message: 'Senha incorreta' });
          });
        });
      },
    ),
  );

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
  });
};
