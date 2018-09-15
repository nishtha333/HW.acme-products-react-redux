const express = require('express');
const app = express();

module.exports = app;

app.use(express.json());
app.use('/api/products', require('./api/products'));
