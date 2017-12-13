var Router = require('express').Router();
const passport = require('passport');

Router.get('/login', (req, res) => {
  res.render('login')
})

Router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))
Router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard/')
})

Router.get('/logout', (req, res) => {
  res.send('Loggin\' ya out')
})


module.exports = Router;
