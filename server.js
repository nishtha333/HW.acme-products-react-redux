const db = require('./db');

db.sync()
    .then(() => db.seed())
    .then(() => "Database sync'ed and seeded");