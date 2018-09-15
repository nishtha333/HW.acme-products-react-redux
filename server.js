const db = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => db.seed())
    .then(() => "Database sync'ed and seeded")
    .then(() => app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`)
    }));