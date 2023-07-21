const model = require("./model");
const db = require('../config/Database')
class transactionModel extends model
{
  constructor(){
    super()
    this.table = 'transaction'
    this.fields = ['transaction_code','fullname','book_id','seller_id','cust_id','email','address','country','zip','count','price','status','created_at']
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