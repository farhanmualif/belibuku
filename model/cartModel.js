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
}

module.exports = cartModel