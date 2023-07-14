const db = require('../config/Database')

class model
{
  constructor(){
    this.table = null
    this.fields = []
    this.timeStamps = false
  }
  
  all(){
    return new Promise((resolve, reject) => {
      db.connect()
      return db.query(`select * from ${this.table}`, (err, result)=>{
        if (err) {
          reject(err)        
        }
        resolve(result)
      })
    })
  }

  findByid(id){
    return new Promise((resolve, reject)=>{
      db.connect()
      return db.query(`select * from ${this.table} where id=${id}`, (err, row)=>{
        if (err) {
          reject(err)
        }
        resolve(row)
      })
    })
  }

  where(column, value){
    return new Promise((resolve, reject)=>{
      db.connect()
      return db.query(`SELECT * FROM ${this.table} WHERE ${column}='${value}'`, (err, row)=>{
        if (err) {
          reject(err)
        }
        resolve(row)
      })
    })
  }
  
  create(req){
    const data = req.body
    return new Promise((solve, reject)=>{
      const value = Object.values(data).map(e=>`'${e}'`)
      db.connect()
      return db.query(`INSERT INTO ${this.table} (${this.fields.join(",")} ) VALUES (${value.join(",")})`, (err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }

  update(req){
    const data = req.body
    db.connect()
    return new Promise((solve,reject)=>{
      return db.query(`UPDATE ${this.table} SET ${this.fields.map(key=>`${key}='${data[key]}'`)} WHERE id=${req.params.id}`,(err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }


  delete(req){
    db.connect()
    return new Promise((solve,reject)=>{
      db.query(`DELETE FROM ${this.table} WHERE id = '${req.params.id}'`,(err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result)
      })
    })
  }

  getTime(){
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 
    const currentYear = currentDate.getFullYear();
    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    return dateString
  }
}


module.exports = model;
