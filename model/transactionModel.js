const model = require("./model");

class transactionModel extends model
{
  constructor(){
    super()
    this.table = 'transaction'
    this.fields = ['seller_id','cust_id','book_id','addresss','payment']
    this.timeStamps = true
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
}

module.exports = transactionModel