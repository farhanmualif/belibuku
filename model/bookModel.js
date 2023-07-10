const model = require('./model');

class bookModel extends model {
  constructor(){
    super();
    this.table = 'tb_book';
    this.fields = ['title', 'author', 'publisher']
  }
}

module.exports = bookModel;
