require("../config/db.config");

const User = require("../models/user.model");
const Project = require("../models/project.model");
const Comment = require("../models/comment.model");
const faker = require("faker");

const userIds = [];

Promise.all([
  User.deleteMany(),
  Project.deleteMany(),
  Comment.deleteMany()
])
  .then(() => {
    console.log('empty database')

    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.sentence(),
        createdAt: faker.date.past(),
      });

      user.save()
        .then(user => {
          userIds.push(user._id);

          for(let j = 0; j < 3; j++) {
            const project = new Project({
              creatorId: user._id,
              name: faker.name.title(),
              content: faker.lorem.paragraph(),
              picPath: faker.random.image(),
              picName: faker.name.title(),
              createdAt: faker.date.past(),
            });

            project.save()
              .then(p => {
                for (let k = 0; k < 10; k++) {
                  const comment = new Comment({
                    authorId: userIds[Math.floor(Math.random() * userIds.length)],
                    projectId: p._id,
                    content: faker.lorem.paragraph(),
                    createdAt: faker.date.past(),
                  });

                  comment.save();
                }
              })
          }
        })
    }
  })