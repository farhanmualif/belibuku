

function auth(req, res, next) {
  if (!req.session.isLogIn) {
    return res.redirect('/login-form')
  }
  next()
}

module.exports = auth