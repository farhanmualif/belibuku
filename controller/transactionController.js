const transactionModel = require('../model/transactionModel')
const transaction = new transactionModel()

async function createTransaction(req, res) {
  try {
    const insertTransaction = await transaction.create(Object.values(req.body))
    console.log('insert transaction: ',insertTransaction)
    req.flash('success','pemesanan berhasil dibuat')
    return res.redirect('/home')
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getMyTransaction(req, res){
  transaction.getTransaction(req)
  .then((result) => {
    console.log(result)
    return res.render('myBooking')
  }).catch((err) => {
    throw err
  });
  // const id = req.params.id
  // console.log('book id : ',id)
  // try {
  //   await transaction.getTransaction(req)
  //   return res.render('myBooking')
  // } catch (error) {
  //   throw error
  // }
}

module.exports = {createTransaction, getMyTransaction}