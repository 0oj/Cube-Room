var Router = require('express').Router();

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login')
  } else{
    next()
  }
}

Router.get('/', authCheck, (req, res) => {
  res.send(`You are, according to google, ${req.user.username}`)
})

module.exports = Router;
