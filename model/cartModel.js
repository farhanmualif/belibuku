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

  getUserCartProduct(){
    // code ..
  }

  insertCart(req){
    db.connect()
    db.beginTransaction((err)=>{

      if (err) {
        throw err
      }

      db.query(`INSERT INTO ${this.table} (${this.fields.join(",")}) VALUES ('${req.params.id}','${req.session.userId}')`,(err, result)=>{
        if (err) {
          throw err
        }
        console.log(result)
      })
      
    }) 
  }
}

module.exports = cartModel