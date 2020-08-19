# Summerproject

Summer Project is a project manager created as a summer homework from Ironhack bootcamp.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install summer project.

```bash
npm i
npm run seeds
npm run dev
```

Edit the **.env.template** file and save it as **.env**.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **home** - As a user I can see the projects and I must have a profile to see projects details, like or comment them.
- **sign up** - As a user, to have a profile, I must fill the form.
- **login** - As a user, that can interact with the projects, I must be logged in.
- **projects** - As a user, I want to see the projects detail to comment on them o edit my own projects.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **edit user** - As a user I want to be able to edit my profile.

## Server Routes (Back-end):

| **Method** | **Route** | **Description** | Request - Body |
| --- | --- | --- | --- |
| `GET` | `/` | Main page route. Renders home `index` view, no logged user. |  |
| `GET` | `/login` | Renders `login` form view. |  |
| `POST` | `/login` | Sends Login form data to the server, redirect to the `index` view. | { email, password } |  |
| `GET` | `/signup` | Renders `signup` form view. |  |
| `POST` | `/signup` | Sends Sign Up info to the server and creates user in the DB. | { The entire model of Project } |
| `GET` | `/activate/:token` | Render `index` after email activation. |  |
| `GET` | `/project/:id` | Renders `projects/project` project detail and form view. |  |
| `POST` | `/project/:id` | Sends edited project info to the DB. | { The entire model of Project } |
| `GET` | `/project/:id/new` | Renders `users/user-project` form view. |  |
| `POST` | `/project/:id/new` | Sends New Project info to the server an creates project in the DB. Then render `index` with the new project. | { The entire model of Project } |
| `POST` | `/project/:id/edit` | For the project owner, a page to edit the project. | { The entire model of Project } |
| `GET` | `/project/:id/delete` | Delete the logged user project(s). |  |
| `GET` | `/user-profile/:id` | Render `user/user-profile` to edit profile. |  |
| `GET` | `/user-projects/:id` | Render user projects `user/user/projects` |  |
| `POST` | `/user-profile/:id/edit` | Sends info of the user profile to the DB and update it. | { The entire model of User } |
| `GET` | `/user-profile/:id/delete` | Delete the user profile and render `index` page. |  |
| `POST` | `/:id/like` | Like method for projects. |  |

## Models

User model

```
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name needs at last 3 chars'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, 'Email is invalid']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    avatar: {
      type: String
    },
    password: {
      type: String,
      minlength: [8, 'password min length is 8']
    },
    bio: {
      type: String,
      maxlength: 100
    },
    activation: {
      active: {
        type: Boolean,
        default: false
      },
      token: {
        type: String,
        default: generateRandomToken
      }
    },
    role: {
      type: String,
      enum: ['GUEST', 'ADMIN'],
      default: 'GUEST'
    },
    social: {
      slack: String,
      google: String,
      facebook: String
    }
  }
```

Project model

```
{
    name: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    creatorId: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    },
    url: {
      type: String
    },
    github: {
      type: String
    }
  }
```

Comments model

```
{
    content: {
      type: String
    },
    authorId: {
      type: ObjectId,
      ref: 'User'
    },
    projectId: {
      type: ObjectId,
      ref: 'Project'
    },
    imagePath: {
      type: String
    },
    imageName: {
      type: String
    }
  }
```

Like model

```
{
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    project: {
      type: ObjectId,
      ref: 'Project',
      required: true
    }
  }
```