const db = require('../config/Database');
const model = require('./model');

class cartModel extends model
{
  constructor()
  {
    super()
    this.table = 'cart'
    this.fields = ['book_id','user_id']
  }

  getCartProduct(id){
    db.connect()
    return new Promise((solve, reject)=>{
      return db.query(`SELECT tb_book.*, COUNT(*) AS jumlah from users JOIN cart ON users.id = cart.user_id JOIN tb_book ON cart.book_id = tb_book.id WHERE users.id = ${id} GROUP BY cart.book_id;`, (err, result)=>{
        if (err) {
          console.log(err)
          reject(err)
        }
        solve(result)
      })
    })
  }

  insertCart(req){
    db.connect()
    db.beginTransaction((err)=>{

      if (err) {
        throw err
      }

      db.query(`INSERT INTO cart (book_id, user_id) VALUES ('${req.params.id}','${req.session.userId}')`,(err, result)=>{

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