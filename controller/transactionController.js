const paymentModel = require('../model/paymentMoodel')
const transactionModel = require('../model/transactionModel')
const transaction = new transactionModel()
const payModel = new paymentModel()
const db = require('../config/Database')
const { getRandomString } = require('../helper/helper')

async function createTransaction(req, res) {
  
  try {
    const { bookdata, fullname, email, address, country, payment, zip } = req.body;
    const datas = JSON.parse(bookdata);
    const book = datas.book;
    const transactionCode = getRandomString(10)
    for (const e of book) {
      try {
        await new Promise((resolve, reject) => {
          db.beginTransaction(async (err) => {
            if (err) {
              reject(err);
              return;
            }

            try {
              // insert into transaction
              const insertTransaction = await transaction.create([
                transactionCode,
                fullname,
                e.book_id,
                e.seller_id,
                req.session.userId,
                email,
                address,
                country,
                zip,
                parseInt(e.count),
                parseInt(e.price),
                'packed',
              ])

              // insert into payment
              await payModel.create([
                transactionCode,
                datas.totalPrice,
                datas.totalCount,
                payment,
              ]);

              db.commit((err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve();
              });
            } catch (error) {
              db.rollback(() => {
                reject(error);
              });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    }

    req.flash('success', 'Berhasil membuat pemesanan');
    return res.redirect('/home');
  } catch (error) {
    console.log(error);
    throw error;
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