// routes/auth.api.js

const { Router } = require('express')
const router = new Router()
const routeGuard = require('../middlewares/session.middleware')
const User = require('../models/user.model')
const Project = require('../models/project.model')

router.get('/admin/projects', routeGuard.isAuthenticated, (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    Project.find()
      .then((data) => res.json(data))
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
})

router.get('/admin/users', routeGuard.isAuthenticated, (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    User.find()
      .then((data) => res.json(data))
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
})

module.exports = router