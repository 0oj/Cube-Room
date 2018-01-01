var Router = require('express').Router();
const Room = require('../models/room');

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login')
  } else{
    next()
  }
}

Router.get('/', authCheck, (req, res) => {
  Room.find({
    members: req.user.id
  }, (err, rooms) => {
    res.render('dashboard', {user: req.user, rooms: rooms})
  })
})


module.exports = Router;
