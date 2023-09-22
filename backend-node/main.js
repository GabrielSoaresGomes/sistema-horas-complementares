const express = require('express');
require('dotenv').config();
const logger = require('morgan');
require('./entity/environment-validation');

const routerUser = require('./routes/user');
const routerAuth = require('./routes/auth');
const routerActivity = require('./routes/activity');
const routerCourse = require('./routes/course');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/users', routerUser);
app.use('/auth', routerAuth);
app.use('/activity', routerActivity);
app.use('/course', routerCourse);

module.exports = app;