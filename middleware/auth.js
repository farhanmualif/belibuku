const userModel = require("../model/userModel")
const user = new userModel()



exports.authMiddleware = function auth(req, res, next) {
  if (!req.session.isLogIn) {
    return res.render('login')
  }
  return next()
}


exports.custPermision = async function CustomerPermision(req, res, next) {
  const model = await user.getUserWithRole(req.session.userId)
  try {
    if (model.role_name !== 'customer') {
      return res.send('Your Not Permission')
    } 
    next()
  } catch (error) {
    console.log(error)
  }
}

exports.sellerPermision = async function SellerPermision(req, res, next) {
  const model = await user.getUserWithRole(req.session.userId)
  try {
    if (model.role_name !== 'seller') {
      return res.send('Your Not Permission')
    } 
    next()
  } catch (error) {
    console.log(error)
  }
}