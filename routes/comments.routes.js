// routes/comments.routes.js


const { Router } = require('express')
const router = new Router()
const User = require('../models/user.model')
const Project = require('../models/project.model')
const Comment = require('../models/comment.model')
const mongoose = require('mongoose')
const uploads = require('../config/multer.config')
const routeGuard = require('../middlewares/session.middleware');
const {route} = require('./index.routes')


////////////////////////////////////////////////////////////////////////
////////////////////////// COMMENT PROJECT /////////////////////////////
////////////////////////////////////////////////////////////////////////


router.get(`/project/:id`, routeGuard.isAuthenticated, (req, res, next) => {
  const user = req.session.currentUser
  Project.findById(req.params.id)
    .populate('creatorId')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'User'
      }
    })
    .then((project) => {
      if (user) {
        console.log(project)
        if (user._id == project.creatorId._id) {
          const owner = true
          res.render('projects/project', { project, owner: owner })
        } else {
          res.render('projects/project', { project })
        }
      } else {
        res.render('projects/project', { project })
      }
    })
    .catch((error) => next(error))
})


router.post(
  '/project/:id',
  uploads.single('imagePath'),
  routeGuard.isAuthenticated,
  (req, res, next) => {
    req.body.imagePath = req.file ? req.file.filename : undefined
    const user = req.session.currentUser
    Comment.create({
      content: req.body.content,
      authorId: user._id,
      projectId: req.params.id,
      imagePath: `${process.env.CLOUDINARY_SECURE}/${req.body.imagePath}`,
      imageName: req.body.imageName
    })
    Project.findById(req.params.id)
      .populate('creatorId')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'authorId',
          model: 'User'
        }
      })
      .then((project) => {
        res.render('projects/project', { project })
      })
      .catch((error) => next(error))
  }
)



module.exports = router