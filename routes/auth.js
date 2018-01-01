var Router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');


Router.get('/login', (req, res) => {
  User.count({}, (err, users) => {
    res.render('login', {users: users})
  })
})


Router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
Router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/'))

Router.get('/github', passport.authenticate('github', { failureRedirect: '/auth/login' }))
Router.get('/github/redirect', passport.authenticate('github'), (req, res) => res.redirect('/'))

Router.get('/twitter', passport.authenticate('twitter', { failureRedirect: '/auth/login' }))
Router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => res.redirect('/'))

Router.get('/wca', passport.authenticate('wca', { failureRedirect: '/auth/login' }))
Router.get('/wca/redirect', passport.authenticate('wca'), (req, res) => res.redirect('/'))

Router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))
Router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => res.redirect('/'))


Router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login/')
})


module.exports = Router;
