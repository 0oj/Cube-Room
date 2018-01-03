const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter');
const WCAStrategy = require('passport-wca');
const LinkedinStrategy = require('passport-linkedin');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

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
          googleId: profile.id,
          emails: profile.emails,
          thumbnail: profile._json.image.url,
          provider: 'Google'
        }).save().then(newUser => done(null, newUser))
      }
    })
  })
)

passport.use(
  new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "/auth/github/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({githubId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('User already in the DB');
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          githubId: profile.id,
          emails: profile.emails,
          thumbnail: profile._json.avatar_url,
          provider: 'Github'
        }).save().then(newUser => done(null, newUser))
      }
    })
  })
)

passport.use(
  new TwitterStrategy({
    consumerKey: keys.twitter.clientID,
    consumerSecret: keys.twitter.clientSecret,
    callbackURL: "/auth/twitter/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({twitterId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('User already in the DB');
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          twitterId: profile.id,
          thumbnail: profile.photos[0].value,
          provider: 'Twitter'
        }).save().then(newUser => done(null, newUser))
      }
    })
  })
)

passport.use(
  new WCAStrategy({
    clientID: keys.wca.clientID,
    clientSecret: keys.wca.clientSecret,
    callbackURL: "http://localhost:10003/auth/wca/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({wcaId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('User already in the DB');
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          wcaId: profile.id,
          thumbnail: profile.photos[0].value,
          provider: 'WCA',
          WCAID: profile.wca.id
        }).save().then(newUser => done(null, newUser))
      }
    })
  })
)

passport.use(
  new LinkedinStrategy({
    consumerKey: keys.linkedin.clientID,
    consumerSecret: keys.linkedin.clientSecret,
    callbackURL: "/auth/linkedin/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({linkedinId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('User already in the DB');
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          linkedinId: profile.id,
          thumbnail: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_80x80_v1.png',
          provider: 'Linkedin'
        }).save().then(newUser => done(null, newUser))
      }
    })
  })
)

passport.use(
  new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // User.findOne({facebookId: profile.id}).then((currentUser) => {
    //   if (currentUser) {
    //     console.log('User already in the DB');
    //     done(null, currentUser)
    //   } else {
    //     new User({
    //       username: profile.displayName,
    //       facebookId: profile.id,
    //       thumbnail: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_80x80_v1.png',
    //       provider: 'Facebook'
    //     }).save().then(newUser => done(null, newUser))
    //   }
    // })
  })
)
