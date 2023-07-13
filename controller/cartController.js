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
  return res.render('checkout',{req, datas, userAddress})
}

// sampai sini
function checkout(req, res) {
  const {fullname, email, address, country, zip, paymentMethod} = req.body
  console.log(fullname, email, address, country, zip, paymentMethod)
}

module.exports = { addCart, showCart, checkoutPage, checkout }