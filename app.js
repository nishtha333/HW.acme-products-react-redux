const path = require('path');
const express = require('express');
const app = express();

module.exports = app;

app.use(express.json());
app.use('/api/products', require('./api/products'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});