const model = require("./model");
const db = require('../config/Database')
class transactionModel extends model
{
  constructor(){
    super()
    this.table = 'transaction'
    this.fields = ['fullname','book_id','seller_id','cust_id','email','address','country','zip','paymentMethod','created_at']
  }

  insertTransaction(seller_id, cust_id, book_id, address, payment, timeStamps){
    return new Promise((solve, reject)=>{
      db.connect()
      return db.query(`INSERT INTO ${this.table} "seller_id, cust_id, book_id, address, payment, timeStamps"} ) VALUES 
      (${seller_id, cust_id, book_id, address, payment, timeStamps})`, (err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }

  getTransaction(id){
    db.connect()
    return new Promise((solve, reject)=>{
      return db.query('SELECT * FROM users JOIN transaction ON users.id = transaction.cust_id JOIN tb_book ON transaction.book_id = tb_book.id WHERE users.id = ?',[id] ,(err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }
  incomeTransaction(id){
    db.connect()
    return new Promise((solve, reject)=>{
      return db.query('SELECT * FROM users JOIN transaction ON users.id = transaction.seller_id JOIN tb_book ON transaction.book_id = tb_book.id WHERE users.id = ?',[id] ,(err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }
}

module.exports = transactionModel