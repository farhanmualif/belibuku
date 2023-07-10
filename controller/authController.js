const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const db = require('../config/Database');
const user =  new userModel()


function login_form (req, res){
      if(typeof req.session.isLogIn === 'boolean') {
      return res.redirect('/home')
    }
    res.render('login')
}

async function login(req, res) {
  const { email, password } = req.body;
  
  const userEmail = await user.where('email',email)
  for (const e of userEmail){
      const compare_password = await bcrypt.compare(password, e.password)
      if (compare_password) {
        req.session.name  = e.name
        req.session.isLogIn  = true
        req.session.userId = e.id
        res.redirect('/home')
        break
      }
      res.redirect('/login-form')
  }
}

function register_form(req, res) {
  db.connect()
  db.query('SELECT * FROM role', (err, rows)=>{
    if(err){
      console.log(err)
      db.end()
      return
    }
    res.render('register-form',{data:rows});
  })
}

async function register(req, res) {
  const {name, email,password,role} = req.body
  const pass_hash = await bcrypt.hash(password,10)
  db.connect()
  db.query(`INSERT INTO users (name, email, password) VALUES ('${name}','${email}','${pass_hash}')`,(error,result)=>{
    if (error) {
      console.log(error)
      req.flash('failure','Gagal Insert Data')
      res.redirect('home')
      return
    }
    const role_id = parseInt(role)
    db.query(`INSERT INTO user_role (user_id, role_id)
    VALUES ('${result.insertId}','${role_id}')`,(error, result)=>{
      if (error) {
        console.log(error)
        req.flash('failure','Gagal Insert Data')
        res.redirect(`/home`)
      }
      req.flash('success','Berhasil Menambahkan Data')
      res.redirect('/home')
    })
  })
}

function logout(req, res) {
  req.session.destroy()
  res.redirect('/login-form')
}

module.exports = { login_form, login, register_form, register, logout}
