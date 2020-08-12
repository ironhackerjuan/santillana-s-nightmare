require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const path         = require('path');

require('./config/db.config')
require('./config/hbs.config')

const passport = require('./config/passport.config');
const session = require("./config/session.config");

const app = express();

// bind user to view - locals
const routeGuard = require('./middlewares/session.middleware');

// const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session)

app.use(routeGuard.isNotAuthenticated)
app.use(passport)

// Express View engine setup

// app.use(
//   require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));




// Routers
const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const crud = require('./routes/crud.routes');
const comments = require('./routes/comments.routes')
const socialRouter = require('./routes/social.routes')
const adminRouter = require('./routes/admin.routes')
const apiRouter = require('./routes/api.routes')

// Routes middleware
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', crud);
app.use('/', comments)
app.use('/', socialRouter)
app.use('/', adminRouter)
app.use('/', adminRouter)
app.use('/', apiRouter)

module.exports = app;
