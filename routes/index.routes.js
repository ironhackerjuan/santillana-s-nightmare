// routes/auth.index.js

const express = require('express')
const Project = require('../models/project.model')
const Like = require('../models/like.model')
const router = express.Router()
const routeGuard = require('../middlewares/session.middleware')


/* GET home page */

router.get('/', (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.role === 'ADMIN') {
    res.redirect('/admin')
  } else {
    Project.find()
      .populate('creatorId')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'authorId',
          model: 'User'
        }
      })
      .populate('likes')
      .then((project) => {
        // res.json(project.comments)
        res.render('index', {
          project,
          title: 'Summer project'
        })
      })
      .catch(next)
  }
})

router.post('/:id/like', routeGuard.isAuthenticated, (req, res, next) => {
  const params = { project: req.params.id, user: req.session.currentUser._id }
  console.log(params)
  Like.findOne(params)
    .then((like) => {
      if (like) {
        Like.findByIdAndRemove(like._id)
          .then(() => {
            res.json({ like: -1 })
          })
          .catch(next)
      } else {
        const newLike = new Like(params)
        newLike
          .save()
          .then(() => {
            res.json({ like: 1 })
          })
          .catch(next)
      }
    })
    .catch(next)
})

module.exports = router;