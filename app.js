const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash')
const router = require('./router/router')
const app = express()



app.set('view engine','ejs');
app.use(express.static('public'))
// setup express-session
app.use(
  session({
    secret: 'pampam12345',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, 
    },
  })
);

// setup flash
app.use(
  flash({
    sessionKeyName: 'express-flash-message',
  })
);

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)
router.use('/',router)

const port = 8080;
app.listen(port,()=>{
  console.log(`Server runing on ${port}`);
});

module.exports = app