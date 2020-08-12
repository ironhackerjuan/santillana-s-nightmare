// routes/social.routes.js

const { Router } = require('express')
const router = new Router()
const routeGuard = require('../middlewares/session.middleware')
const passport = require('passport')

////////////////////////////////////////////////////////////////////////
////////////////////////// SOCIAL SIGN UP //////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/auth/slack', routeGuard.isNotAuthenticated, (req, res, next) => {
  const passportController = passport.authenticate('slack', (error, user) => {
    if (error) {
      next(error)
    } else {
      req.session.currentUser = user
      res.redirect('/')
    }
  })
  passportController(req, res, next)
})

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  routeGuard.isNotAuthenticated
)

router.get(
  '/auth/google/callback',
  routeGuard.isNotAuthenticated,
  (req, res, next) => {
    const passportController = passport.authenticate(
      'google',
      (error, user) => {
        if (error) {
          next(error)
        } else {
          req.session.currentUser = user
          res.redirect('/')
        }
      }
    )
    passportController(req, res, next)
  }
)


router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
  routeGuard.isNotAuthenticated
)

router.get(
  '/auth/facebook/callback',
  routeGuard.isNotAuthenticated,
  (req, res, next) => {
    const passportController = passport.authenticate(
      'facebook',
      (error, user) => {
        if (error) {
          next(error)
        } else {
          req.session.currentUser = user
          res.redirect('/')
        }
      }
    )
    passportController(req, res, next)
  }
)

module.exports = router