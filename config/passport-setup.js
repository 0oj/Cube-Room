const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => User.findOneById(id).then(user => done(null, user.id)))

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('User already in the DB');
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then(newUser => done(null, currentUser))
      }

    })
  })
)
