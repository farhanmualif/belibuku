const db = require('../config/Database');
const bookModel = require('../model/bookModel');
const {getRole} = require('../helper/helper');
const fs = require('fs');
const book = new bookModel()

async function index(req, res) {
  try {
    const row =  await book.getUsersAndBooks()
    const role = await getRole(req.session.userId)
    return res.render('index',{data:row, req, role: role.name})
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
  let file_name = ''
  const inputUser = req.body
  if(req.files === null){
    file_name = 'default.png'
  } else {
    const { image } = req.files
    const file = image.name
    const ext = file.substring(file.lastIndexOf('.') + 1);
    file_name = `${image.md5}.${ext}`
    image.mv(`public/images/${file_name}`, err => {
      if (err) {
        throw err
      }
      console.log('berhasil upload gambar')
    })
  }
  db.beginTransaction(async (err) => {
    if (err) {
      throw err
    }
    const create = await book.create([inputUser.title,inputUser.author,inputUser.publisher, inputUser.price, file_name])
    const insertUserBook = await book.insertUserBook(req.session.userId,create.insertId)
    console.log(insertUserBook)
    req.flash('success', 'berhasil insert data')
    db.commit(err => {
      if (err) {
        req.flash('failure', 'gagal insert data')
        throw err
      }
    })
    return res.redirect('/home')
  })
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

async function remove(req, res) {
  db.beginTransaction(async (err)=>{
    if (err) {
      req.flash('failure','gagal menghapus data')
      throw err
    }
    // delete from database
    await book.deleteWhere('id','=',req.params.id)
    // delete from folder
    if (req.params.img !== 'default.png') {
      fs.unlink(`public/images/${req.params.img}`,()=>{
        console.log('berhasil delete image from folder')
      })
    }
    db.commit(err=>{
      if (err) {
        throw err
      }
      req.flash('success','berhasil menghapus data')
      return res.redirect('/home')
    })
  })
}

module.exports = { store, form, show, update, index, remove }