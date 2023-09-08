const express = require('express');
require('dotenv').config();

const router = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/', router);

module.exports = app;