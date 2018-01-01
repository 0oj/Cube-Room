var Router = require('express').Router();
const Room = require('../models/room');
const User = require('../models/user');

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login')
  } else{
    next()
  }
}
const memberCheck = (req, res, next) => {
  Room.findOne({_id: req.params.id}, (err, room) => {
    if (room.members.indexOf(req.user.id) === -1) {
      res.send('<h1>You\'re not part of the Room</h1>')
    } else{
      res.locals.room = room;
      next();
    }
  })
}


Router.get('/room/:id', authCheck, memberCheck, (req, res) => {
  res.render('room', {room: res.locals.room, user: req.user});
})

Router.get('/new', authCheck, (req, res) => {
  res.render('new_room.ejs', {user: req.user});
})

Router.post('/new', (req, res) => {
  Room(req.body).save();
})

Router.get('/user', (req, res) => {
  User.find({'username': {'$regex': req.query.username, '$options': 'i'}}, (err, users) => res.send(users))
})

module.exports = Router;
