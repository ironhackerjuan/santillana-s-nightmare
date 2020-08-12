// routes/admin.routes.js

const { Router } = require('express')
const router = new Router()
const routeGuard = require('../middlewares/session.middleware')
const User = require('../models/user.model')
const Project = require('../models/project.model')

////////////////////////////////////////////////////////////////////////
/////////////////////////////// ADMIN //////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/admin', routeGuard.isAuthenticated, (req, res, next) => {
  const user = req.session.currentUser
  if (user.role === 'ADMIN') {
    const users = User.find()
    const projects = Project.find()
    Promise.all([users, projects])
      .then((values) => {
        // res.json(values[0])
        res.render('users/admin-profile', {
          users: values[0],
          projects: values[1],
          title: 'Admin page',
          admin: true
        })
      })
      .catch((error) => next(error))
  } else {
    res.redirect('/')
  }
})





module.exports = router