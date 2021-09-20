const server = require('./api/server')

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`))


// "migrate": "knex migrate:latest",
// "seed": "knex seed: run"

// --> might need npx knex migrate:latest @ script