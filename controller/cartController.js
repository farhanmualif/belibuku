const { getRandomString } = require('../helper/helper')
const cartModel  = require('../model/cartModel')
const cart = new cartModel()

// sampai add carthttps://www.showroom-live.com/
async function showCart(req, res){
  try {
    const row = await cart.getCartProductWhereUserId(req.session.userId)
    return res.render('cart',{row, req})
  } catch (error) {
    throw error
  }
}

async function addCart(req, res) {
  const {book_id, cust_id, seller_id} = req.body
  const cart_code = getRandomString(10)
  try {
    cart.create(Object.values([cart_code,book_id,cust_id,seller_id]))
    req.flash('success', 'berhasil menambahkan buku ke keranjang')
    return res.redirect('/home')
  } catch (error) {
    throw error
  }
}

async function checkoutPage(req, res) {
  const { data } = req.body
  let row = JSON.parse(data)
  return res.render('checkout',{row, req})
}

module.exports = { addCart, showCart, checkoutPage }