var Router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');


Router.get('/login', (req, res) => {
  User.count({}, (err, users) => {
    res.render('login', {users: users})
  })
})

Router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))
Router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
})

Router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login/')
})


module.exports = Router;
