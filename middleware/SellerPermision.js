const userModel = require("../model/userModel")

const user = new userModel()

async function SellerPermision(req, res, next) {
  const model = await user.getUserWithRole(req.session.userId)
  try {
    if (model.role_name !== 'seller') {
      res.send('Your Not Permission')
    } 
    next()
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = SellerPermision