const db = require('../config/Database');
const model = require('./model');

class cartModel extends model
{
  constructor()
  {
    super()
    this.table = 'cart'
    this.fields = ['cart_code','book_id','cust_id','seller_id','created_at']
  }

  getCartProductWhereUserId(cust_id){
    db.connect()
    return new Promise((solve, reject) => {
      return db.query(`SELECT tb_book.title,  tb_book.author,  tb_book.publisher,  tb_book.price,  tb_book.image, address.id AS address_id, address.address, address.country, tb_book.id AS book_id, cart.cust_id, cart.seller_id AS seller_id, COUNT(cart.book_id) AS jumlah FROM cart  JOIN  tb_book ON cart.book_id = tb_book.id JOIN users ON users.id = cart.cust_id JOIN   address ON cart.cust_id=address.user_id  WHERE  users.id = ${cust_id} GROUP BY cart.book_id, cart.seller_id, address.address, address.country, address_id`, (err, result)=>{
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