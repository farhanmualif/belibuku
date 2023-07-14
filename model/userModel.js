const db = require('../config/Database');
const model = require('./model');


class userModel extends model
{
  constructor(){
    super();
    this.table = 'users';
    this.fields = ['name', 'email', 'password']
  }

  getUserWithRole(id){
    db.connect()
    return new Promise((solve, reject)=>{
      db.query(`SELECT *, role.name as role_name FROM users JOIN user_role on users.id = user_role.user_id JOIN role on user_role.role_id = role.id WHERE users.id=${id}`,(err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result[0])
      })
    })
  }
  getUserWhereBookId(book_id = null){
    if (book_id == null) {
      throw "terjadi kesalahan"
    }
    db.connect()
    return new Promise((solve, reject)=>{
      return db.query(`SELECT users.id, users.name, users.email FROM tb_book JOIN user_book on tb_book.id = user_book.book_id JOIN users on users.id = user_book.user_id WHERE tb_book.id = ${book_id} `, (err, result)=>{
        (err) ? reject(err) : solve(result)
      })
    })
  }
}

module.exports = userModel