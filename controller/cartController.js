const cartModel  = require('../model/cartModel')
const cart = new cartModel()

function store(req, res, next) {
  cart.create(req)
}