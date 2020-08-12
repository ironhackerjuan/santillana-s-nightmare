// routes/crud.routes.js

const { Router } = require('express')
const router = new Router()
const Project = require('../models/project.model')
const User = require('../models/user.model')
const uploads = require('../config/multer.config')
const routeGuard = require('../middlewares/session.middleware')
const bcryptjs = require('bcryptjs')
const saltRounds = 10

////////////////////////////////////////////////////////////////////////
//////////////////////// POST OR READ PROJECT //////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/project/:id/new', routeGuard.isAuthenticated, (req, res) => {
  res.render('users/user-project')
})
router.post(
  '/project/:id/new',
  uploads.single('picPath'),
  routeGuard.isAuthenticated,
  (req, res, next) => {
    req.body.picPath = req.file ? req.file.filename : undefined
    const id = req.params.id
    return Project.create({
      name: req.body.name,
      content: req.body.content,
      creatorId: id,
      picName: req.body.picName,
      // picPath: req.body.picPath
      picPath: `${process.env.CLOUDINARY_SECURE}/${req.body.picPath}`,
      url: req.body.url
    })
      .then(() => {
        res.redirect(`/`)
      })
      .catch((error) => next(error))
  }
)
////////////////////////////////////////////////////////////////////////
///////////////////// UPDATE OR DELETE PROJECT /////////////////////////
////////////////////////////////////////////////////////////////////////
router.post(
  '/project/:id/edit',
  uploads.single('picPath'),
  routeGuard.isAuthenticated,
  (req, res, next) => {
    req.body.picPath = req.file ? req.file.filename : undefined
    const id = req.params.id
    const body = req.body
    if (req.body.picPath) {
      Project.findByIdAndUpdate(id, {
        name: req.body.name,
        content: req.body.content,
        creatorId: req.session.currentUser._id,
        picPath: `${process.env.CLOUDINARY_SECURE}/${req.body.picPath}`,
        picName: req.body.picName,
        url: req.body.url
      })
        .then(() => {
          res.redirect(`/project/${id}`)
        })
        .catch((error) => next(error))
    } else {
      Project.findByIdAndUpdate(id, {
        name: req.body.name,
        content: req.body.content,
        creatorId: req.session.currentUser._id,
        picName: req.body.picName,
        url: req.body.url
      })
        .then(() => {
          res.redirect(`/project/${id}`)
        })
        .catch((error) => next(error))
    }
  }
)
router.get(
  '/project/:id/delete',
  routeGuard.isAuthenticated,
  (req, res, next) => {
    const id = req.params.id
    Project.findByIdAndDelete(id)
      .then(() => {
        if (req.session.currentUser.role === 'ADMIN') {
          res.redirect('/admin')
        } else {
          res.redirect('/')
        }
      })
      .catch((error) => next(error))
  }
)
////////////////////////////////////////////////////////////////////////
///////////////////////////// RENDER USER //////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get(
  '/user-profile/:id',
  routeGuard.isAuthenticated,
  (req, res, next) => {
    const id = req.params.id
    User.findById(id)
      .then((user) => {
        // res.json(user)
        const userId = req.session.currentUser._id
        if (userId === id) {
          res.render('users/user-profile', { user })
        } else {
          req.session.destroy()
          res.render('auth/login', {
            message: 'Something is wrong with your user, please login again.'
          })
        }
      })
      .catch((error) => next(error))
  }
)
////////////////////////////////////////////////////////////////////////
//////////////////////// UPDATE OR DELETE USER /////////////////////////
////////////////////////////////////////////////////////////////////////
router.post(
  '/user-profile/:id/edit',
  routeGuard.isAuthenticated,
  uploads.single('avatar'),
  (req, res, next) => {
    const { username, email, avatar, password, bio } = req.body
    // make sure passwords are strong:
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!regex.test(password)) {
      res.status(500).render('users/user-profile', {
        errorMessage:
          'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
      })
      return
    }
    const id = req.params.id
    bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        req.body.avatar = req.file ? req.file.filename : undefined
        const id = req.params.id
        console.log(req.body)
        if (req.body.avatar) {
          return User.findByIdAndUpdate(id, {
            // username: username
            name: req.body.name,
            avatar: `${process.env.CLOUDINARY_SECURE}/${req.body.avatar}`,
            password: hashedPassword,
            bio: req.body.bio
          })
        } else {
          return User.findByIdAndUpdate(id, {
            // username: username
            name: req.body.name,
            password: hashedPassword,
            bio: req.body.bio
          })
        }
      })
      .then(() => {
        res.redirect(`/user-profile/${id}`)
      })
      .catch((error) => next(error))
    // close .catch()
  }
)
router.get(
  '/user-profile/:id/delete',
  routeGuard.isAuthenticated,
  (req, res, next) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
      .then(() => {
        if (req.session.currentUser.role === 'ADMIN') {
          res.redirect('/admin')
        } else {
          req.session.destroy()
          res.redirect('/')
        }
      })
      .catch((error) => next(error))
  }
)
module.exports = router