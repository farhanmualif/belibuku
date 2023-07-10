const express = require('express');
const router = express.Router()

const auth = require('../middleware/auth')
const SellerPermision = require('../middleware/SellerPermision')
const { login_form, login , register_form, register, logout } = require('../controller/authController')
const { index, store, form, show, update, remove } = require('../controller/bookController');


router.post('/register', register)
router.get('/login-form', login_form)
router.post('/login',  login);
router.get('/register-form',register_form)

router.use(auth)
router.get('/book-form', [auth, SellerPermision], form)
router.post('/book-insert', [auth, SellerPermision], store)
router.get('/home',auth, index)
router.get('/detail/:id', auth, show)
router.post('/update/:id', auth, update)
router.post('/delete-book/:id',auth,remove)

router.post('/logout', logout)

module.exports = router