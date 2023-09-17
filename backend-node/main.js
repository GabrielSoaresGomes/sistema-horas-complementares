const express = require('express');
require('dotenv').config();

const routerUser = require('./routes/user');
const routerAuth = require('./routes/auth');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/', routerUser);
app.use('/auth', routerAuth);

module.exports = app;