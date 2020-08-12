// models/User.model.js

const { Schema, model, ObjectId } = require('mongoose');

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
    },
    creatorId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    picPath: {
      type: String,
    },
    picName: {
      type: String
    },
    url: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

projectSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'projectId',
  justOne: false
})

projectSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'project',
  justOne: false
})

module.exports = model('Project', projectSchema);