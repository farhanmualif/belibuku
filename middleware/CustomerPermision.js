const userModel = require("../model/userModel")

const user = new userModel()

async function CustomerPermision(req, res, next) {
  const model = await user.getUserWithRole(req.session.userId)
  try {
    if (model.role_name !== 'customer') {
      res.send('Your Not Permission')
    } 
    next()
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = CustomerPermision