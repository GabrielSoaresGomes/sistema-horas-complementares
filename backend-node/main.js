const express = require('express');
require('dotenv').config();

const env = require('./environment-validation');

const app = express();
const PORT = env.getVar('PORT');





