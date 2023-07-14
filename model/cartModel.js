const db = require('../config/Database');
const model = require('./model');

class cartModel extends model
{
  constructor()
  {
    super()
    this.table = 'cart'
    this.fields = ['book_id','cust_id','seller_id','created_at']
  }

  getCartProduct(cust_id){
    db.connect()
    return new Promise((solve, reject) => {
      return db.query(`SELECT tb_book.*, COUNT(*) AS jumlah, cart.seller_id FROM users JOIN cart ON users.id = cart.cust_id JOIN tb_book ON cart.book_id = tb_book.id WHERE users.id = ${cust_id} GROUP BY tb_book.id, cart.seller_id; `, (err, result)=>{
        if (err) {
          console.log(err)
          reject(err)
        }
        solve(result)
      })
    })
  }

  insertCart(book_id, cust_id, seller_id){
    db.connect()
    db.beginTransaction((err)=>{

      if (err) {
        throw err
      }

      db.query(`INSERT INTO cart (book_id, cust_id, seller_id) VALUES ('${book_id}','${cust_id}',${seller_id})`,(err, result)=>{

        if (err) {
          throw err
        }
        console.log(result)
        db.commit((err)=>{
          if (err) {
            console.log(err)
            return db.rollback(() => {
              console.error('rollback database')
            })
          }
          console.log('add book done')
        })
      })
      
    }) 
  }


}

module.exports = cartModel