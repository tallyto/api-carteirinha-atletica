/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const { connect } = require('mongoose');

const server = express();
const cors = require('cors');
const routes = require('./routes');

server.use(express.json());
server.use(cors());

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


server.listen(3001, () => {
  console.log(`Server in http://localhost:${porta}`);
});
