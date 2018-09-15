const db = require('../db');
const { Products } = db.models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    Products.findAll()
        .then(products => res.send(products))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Products.create(req.body)
        .then(product => res.send(product))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Products.findById(req.params.id)
        .then(product => product.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});

