const transactionModel = require('../model/transactionModel')
const transaction = new transactionModel()

async function createTransaction(req, res) {
  try {
    console.log(req.body)
    const insertTransaction = await transaction.create(Object.values(req.body))
    console.log('insert transaction: ',insertTransaction)
    req.flash('success','pemesanan berhasil dibuat')
    return res.redirect('/home')
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getTransaction(req, res){
  try {
    const getTransaction = await transaction.getTransaction(req.params.id)
    console.log(getTransaction)
    return res.render('myBooking')
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {createTransaction, getTransaction}