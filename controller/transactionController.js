const paymentModel = require('../model/paymentMoodel')
const transactionModel = require('../model/transactionModel')
const transaction = new transactionModel()
const payment = new paymentModel()

async function createTransaction(req, res) {
  try {
    // console.log(req.body)
    // await transaction.create(Object.values(req.body))
    // await payment.create()
    // req.flash('success','pemesanan berhasil dibuat')
    return res.redirect('/home')
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getMyTransaction(req, res){
  try {
    const myTrans = await transaction.getTransaction(req.params.id)
    console.log(myTrans)
  return res.render('myBooking',{myTrans})
  } catch (error) {
    throw error
  }
}

async function incomingTransaction(req, res) {
  try {
    const row = await transaction.incomeTransaction(req.session.userId)
    console.log(row)
    return res.render('incomeTrans',{row})
  } catch (error) {
    throw error
  }
}

module.exports = {createTransaction, getMyTransaction, incomingTransaction}