/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const { connect } = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');

const server = express();
const cors = require('cors');
const routes = require('./routes');


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(serveStatic(path.join(__dirname, 'public')));

server.use(cors());

server.engine('handlebars', exphbs({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');


connect(
  'mongodb+srv://otallytodev:1233211996@cluster0-jq9ag.mongodb.net/carteirinha?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true },
)
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
  })
  .catch(() => console.log('Erro ao conectar ao banco de dados'));

server.use(routes);


const porta = process.env.PORT || 3001;


server.listen(porta, () => {
  console.log(`Server in http://localhost:${porta}`);
});
