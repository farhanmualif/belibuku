const db = require('../config/Database')
const randomstring = require('randomstring')

function getRole(id) {
  db.connect()
  return new Promise((solve, reject)=>{
    return db.query(`SELECT role.name FROM users JOIN user_role on users.id = user_role.user_id JOIN role on user_role.role_id = role.id WHERE users.id=${id}`, (err, result)=>{
      if (err) {
        reject(err)
      }
      solve(result[0])
    })
  })
}

function getRandomString(length) {
  return randomstring.generate({
    length: length,
    charset: ['numeric', 'alphabetic']
  });
}

module.exports = { getRole, getRandomString }