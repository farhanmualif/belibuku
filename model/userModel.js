const db = require('../config/Database');
const model = require('./model');


class userModel extends model
{
  constructor(){
    super();
    this.table = 'users';
    this.fields = ['name', 'email', 'password']
  }

  getUserWithRole(id){
    db.connect()
    return new Promise((solve, reject)=>{
      db.query(`SELECT *, role.name as role_name FROM users JOIN user_role on users.id = user_role.user_id JOIN role on user_role.role_id = role.id WHERE users.id=${id}`,(err, result)=>{
        if (err) {
          reject(err)
        }
        solve(result[0])
      })
    })

  }
}

module.exports = userModel