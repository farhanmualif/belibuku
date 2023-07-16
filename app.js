const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const router = require('./router/router')
const app = express()

app.set('view engine','ejs');
app.use(express.static('public'))

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

app.use(
  flash({
    sessionKeyName: 'express-flash-message',
  })
);

app.use(express.json())
app.use(fileUpload({
  limits:{
    fileSize: 10000000
  },
  abortOnLimit: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router)

const port = 8080;
app.listen(port,()=>{
  console.log(`Server running on port ${port}`);
});

module.exports = app
