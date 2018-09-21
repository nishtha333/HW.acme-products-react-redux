const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

/* See Prof's notes: Broken down into multiple files:
- conn.js: Sequelize connection
- Product.js - Product Model
- index.js: syncAndSeed and export model and that method
*/
const Products = conn.define('product', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rating: {
        type: Sequelize.INTEGER
    }
});

const sync = () => {
    return conn.sync({ force: true });
}

const seed = () => {
    return Promise.all([
        Products.create({ name: "Apple iPhone", rating: 7 }),
        Products.create({ name: "Google Pixel", rating: 9 }),
        Products.create({ name: "Amazon Echo", rating: 8 })
    ]);
}

module.exports = {
    sync,
    seed,
    models: {
        Products
    }
}