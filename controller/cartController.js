const cartModel  = require('../model/cartModel')
const cart = new cartModel()

function addCart(req, res) {
  try {
    cart.insertCart(req)
    return res.redirect('/home')
  } catch (error) {
    throw error
  }
  
}


module.exports = {addCart}