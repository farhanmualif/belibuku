const cartModel  = require('../model/cartModel')
const cart = new cartModel()

async function showCart(req, res){
  try {
    const row = await cart.getCartProduct(req.session.userId)
    return res.render('cart',{row})
  } catch (error) {
    console.log(error)
  }
}

async function addCart(req, res) {
  try {
    cart.insertCart(req)
    req.flash('success', 'berhasil menambahkan buku ke keranjang')
    return res.redirect('/home')
  } catch (error) {
    throw error
  }
}


module.exports = { addCart, showCart }