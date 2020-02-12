const mongoose = require('mongoose');

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://otallytodev:1233211996@cluster0-jq9ag.mongodb.net/carteirinha?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
      },
    ).then(() => {
      console.log('banco de dados conectado');
    }).catch(() => {
      console.log('falha ao conectar o banco');
    });
  }
}

module.exports = new Database();
