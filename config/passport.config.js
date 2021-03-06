const passport = require('passport')
const User = require('../models/user.model')
const { json } = require('express')
const SlackStrategy = require('passport-slack').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
//SLACK LOG IN

const slack = new SlackStrategy(
  {
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    callbackUrl: '/auth/slack'
  },
  (accessToken, refreshToken, profile, next) => {
    User.findOne({ 'social.slack': profile.id })
      .then((user) => {
        if (user) {
          next(null, user)
        } else {
          const newUser = new User({
            name: profile.displayName,
            username: profile.user.email.split('@')[0],
            email: profile.user.email,
            avatar: profile.user.image_1024,
            password:
              profile.provider + Math.random().toString(36).substring(7),
            social: {
              slack: profile.id
            }
          })
          newUser
            .save()
            .then((user) => {
              next(null, user)
            })
            .catch((err) => next(err))
        }
      })
      .catch((err) => next(err))
  }
)
//GOOGLE LOG IN
const google = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  
  (accessToken, refreshToken, profile, next) => {
    User.findOne({ 'social.google': profile.id })
      .then((user) => {
        if (user) {
          next(null, user)
        } else {
          const newUser = new User({
            name: profile._json.name,
            username: profile._json.email.split('@')[0],
            email: profile._json.email,
            avatar: profile._json.picture,
            password:
              profile.provider + Math.random().toString(36).substring(7),
            social: {
              google: profile._json.sub
            }
          })
          newUser
            .save()
            .then((user) => {
              next(null, user)
            })
            .catch((err) => next(err))
        }
      })
      .catch((err) => next(err))
  }
)

// FACEBOOK LOG IN

const facebook = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'social.facebook': profile.id })
      .then((user) => {
        console.log(JSON.stringify(profile))
        if (user) {
          done(null, user)
        } else {
          const newUser = new User({
            name: profile._json.name,
            username: profile._json.email.split('@')[0],
            email: profile._json.email,
            avatar: profile._json.picture.data.url,
            password:
              profile.provider + Math.random().toString(36).substring(7),
            social: {
              facebook: profile._json.id
            }
          })


          newUser
            .save()
            .then((user) => {
              done(null, user)
            })
            .catch((err) => done(err))
        }
      })
      .catch((err) => done(err))
  }
)

passport.serializeUser(function (user, next) {
  next(null, user)
})

passport.deserializeUser(function (user, next) {
  next(null, user)
})

passport.use(facebook)
passport.use(slack)
passport.use(google)


module.exports = passport.initialize()