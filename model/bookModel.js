const model = require('./model');
const db = require('../config/Database')

class bookModel extends model {
  constructor(){
    super();
    this.table = 'tb_book';
    this.fields = ['title', 'author', 'publisher','price']
  }

  getBooksWhereUserId(id){
    db.connect()
    return new Promise((solve, reject)=>{
      return db.query(`SELECT tb_book.* FROM users JOIN user_book on users.id = users_book.user_id JOIN tb_book on user_book.book_id = tb_book.id where users.id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }

  insertUserBook(user_id, book_id){
    return new Promise((solve, reject)=>{
      db.connect()
      return db.query(`INSERT INTO user_book (user_id, book_id) VALUES ('${user_id}','${book_id}')`, (err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }
}

module.exports = bookModel;
