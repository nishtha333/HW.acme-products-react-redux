const faker = require('faker');
const db = require('../db');
const { Products } = db.models;
const express = require('express');
const router = express.Router();

module.exports = router;

/* Prof's Notes: Return in desc order of rating */
router.get('/', (req, res, next) => {
    Products.findAll()  //Product.findAll({ order: [['rating', 'DESC']]})
        .then(products => res.send(products))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Products.create({ name: faker.commerce.product(), rating: faker.random.number(10) })
        .then(product => res.send(product)) //Prof's notes - Send status of 201 for post
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Products.findById(req.params.id)
        .then(product => product.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});

/* Prof's Notes: Error Handling */