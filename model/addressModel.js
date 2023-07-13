const model = require('./model')
const db = require('../config/Database')

class addressModel extends model
{
  constructor(){
    super()
    this.table = 'address',
    this.fields = ['user_id','address','country']
  }
  
  getCountryUser(id){
    db.connect()
    return new Promise((solve, reject)=>{
      return db.query(`SELECT * FROM users JOIN ${this.table} ON users.id = address.user_id WHERE users.id = ${id}`, (err, result)=>{
        if (err) {
          console.err(err)
          reject(err)
        }
        solve(result)
      })
    })
  }
}

module.exports = addressModel