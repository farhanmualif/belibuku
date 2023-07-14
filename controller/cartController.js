const addressModel = require('../model/addressModel')
const cartModel  = require('../model/cartModel')
const cart = new cartModel()
const address = new addressModel()

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

async function checkoutPage(req, res) {
  const userAddress = await address.getCountryUser(req.session.userId)
  
  const {data} = req.body
  const datas = JSON.parse(data)
  console.log(datas)
  return res.render('checkout',{req, datas, userAddress})
}

// sampai sini
function checkout(req, res) {

}

module.exports = { addCart, showCart, checkoutPage, checkout }