const db = require('../config/Database');
const bookModel = require('../model/bookModel');
const {getRole} = require('../helper/helper')
const book = new bookModel()


async function index(req, res) {
  try {
    const row =  await book.all()
    const role = await getRole(req.session.userId)
    return res.render('index',{data:row, req, role})
  } catch (error) {
    console.log(error)
    throw error
  }
}


async function show(req, res) {
  try {
    const row = await book.findByid(req.params.id)
    console.log(row)
    return res.render('detail',{row, req})
  } catch (error) {
    console.log(error);
    db.end()
    return res.redirect(`/detail/${req.params.id}`)
  }
}


async function store(req, res) {
  try {
    const create = await book.create(req)
    console.log(create)
    req.flash('success', 'berhasil insert data')
    return res.redirect('/home')
  } catch (error) {
    req.flash('failure', 'gagal insert data')
    throw error
  }
}

function form(req, res) {

  res.render('book-form')
}

async function update(req, res) {
  try {
    const updating = await book.update(req)
    req.flash('success','berhasil update data')    
    console.log(updating)
    return res.redirect('/home')
  } catch (error) {
    req.flash('failure','gagal update data')    
    console.log(error)
    return res.redirect('/home')
  }
}

function remove(req, res) {
  try {
    const del = book.delete(req)
    console.log(del)
    req.flash('success','berhasil menghapus data')
    return res.redirect('/home')
  } catch (error) {
    req.flash('failure','berhasil menghapus data')
  }
}

module.exports = { store, form, show, update, index, remove }