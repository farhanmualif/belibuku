const express = require('express');
const router = express.Router()

const { authMiddleware, custPermision, sellerPermision } = require('../middleware/auth')

const { login_form, login, register_form, register, logout } = require('../controller/authController')
const { index, store, form, show, update, remove } = require('../controller/bookController');
const { addCart, showCart, checkoutPage } = require('../controller/cartController');
const { createTransaction } = require('../controller/transactionController')

router.post('/register', register)
router.get('/login-form', login_form)
router.post('/login', login);
router.get('/register-form', register_form)

router.use(authMiddleware)
router.get('/home', index)
router.get('/detail/:id', show)
router.post('/update/:id', update)
router.post('/delete-book/:id', remove)
router.post('/logout', logout)
router.get('/book-form', [sellerPermision], form)
router.post('/book-insert', [sellerPermision], store)
router.post('/add-cart/:id', [custPermision], addCart)
router.get('/cart', [custPermision], showCart)
router.post('/checkout-page', [custPermision], checkoutPage)
router.post('/transaction', [custPermision], createTransaction)

module.exports = router
