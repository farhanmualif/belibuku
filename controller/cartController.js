const addressModel = require('../model/addressModel')
const cartModel  = require('../model/cartModel')
const userModel = require('../model/userModel')
const cart = new cartModel()
const user = new userModel()
const address = new addressModel()

async function showCart(req, res){
  console.log(req.session.userId)
  try {
    const row = await cart.getCartProduct(req.session.userId)
    let user_id = 0
    if (row[0] != undefined) {
      user_id = row[0].id
    } else {
      user_id = 0
    }
    const owner = await user.getUserWhereBookId(user_id)
    return res.render('cart',{row, owner})
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
  const userAddress = await address.getCountryUser(req.session.userId)
  const {data} = req.body
  const datas = JSON.parse(data)
  return res.render('checkout',{req, datas, userAddress})
}


module.exports = { addCart, showCart, checkoutPage }