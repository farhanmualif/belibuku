const transactionModel = require('../model/transactionModel')
const transaction = new transactionModel()

async function createTransaction(req, res) {
  const {book_id, fullname, email, address, country, zip, paymentMethod} = req.body
  try {
    // sampai sini 
    // get book_user
    const insrtTransaction = await transaction.insertTransaction()
  } catch (error) {
    
  }
  console.log(book_id,fullname, email, address, country, zip, paymentMethod)
}

module.exports = {createTransaction}