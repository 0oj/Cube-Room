var Router = require('express').Router();

Router.get('/login', (req, res) => {
  res.render('login')
})

Router.get('/google', (req, res) => {
  res.send('Loggin ya in with Google')
})

Router.get('/logout', (req, res) => {
  res.send('Loggin\' ya out')
})


module.exports = Router;
