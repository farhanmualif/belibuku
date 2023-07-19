const addressModel = require('../model/addressModel')
const cartModel  = require('../model/cartModel')
const userModel = require('../model/userModel')
const cart = new cartModel()
const user = new userModel()
const address = new addressModel()
// sampai add cart
async function showCart(req, res){
  try {
    const row = await cart.getCartProductWhereUserId(req.session.userId)
    console.log(row)
    return res.render('cart',{row})
  } catch (error) {
    console.log(error)
  }
}

async function addCart(req, res) {
  try {
    cart.create(Object.values(req.body))
    req.flash('success', 'berhasil menambahkan buku ke keranjang')
    return res.redirect('/home')
  } catch (error) {
    throw error
  }
}

async function checkoutPage(req, res) {
  // const getCartBookUser = cart.getCartProductAddressWhereUserId(req.params.id)

  return res.render('checkout',{req, datas, userAddress})
}

module.exports = { addCart, showCart, checkoutPage }