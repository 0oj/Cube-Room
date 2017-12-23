var Router = require('express').Router();
const Room = require('../models/room');
const User = require('../models/user')

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login')
  } else{
    next()
  }
}


Router.get('/room/:id', authCheck, (req, res) => {
  res.render('room', {id: req.params.id})
})

Router.get('/new', authCheck, (req, res) => {
  res.render('new_room.ejs', {user: req.user});
})

Router.get('/user', (req, res) => {
  User.find({'username': {'$regex': req.query.username, '$options': 'i'}}, (err, users) => res.send(users))
})

module.exports = Router;
