const express = require('express');
require('dotenv').config();
const logger = require('morgan');


const routerUser = require('./routes/user');
const routerAuth = require('./routes/auth');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/users', routerUser);
app.use('/auth', routerAuth);

module.exports = app;