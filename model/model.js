const db = require('../config/Database')
const now = Date.now();
const date = new Date(now);
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
  
  create(values){

    const datenow = this.getTime()
    return new Promise((solve, reject)=>{
      db.connect()
      return db.query(`INSERT INTO ${this.table} (${this.fields.join(",")}) VALUES (${values.map(e=> `'${e}'`)},STR_TO_DATE(${datenow}, '%d-%m-%Y %H:%i:%s'))`, (err, result)=>{
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
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const datenow = `'${day}-${month}-${year} ${hours}:${minutes}:${seconds}'`
    return datenow
  }
}


module.exports = model;
