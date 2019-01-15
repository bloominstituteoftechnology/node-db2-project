const express = require('express');
const helmet = require('helmet');
// const knex = require('knex')

// const dbConfig = require('./knexfile')
// const db = knex(dbConfig.development)

const zoosRoute = require('./data/routes/zoosRoute')
const bearsRoute = require('./data/routes/bearsRoute')

const server = express();
server.use(express.json());
server.use(helmet());


// endpoints here
//Zoos Route
server.use('/api/zoos', zoosRoute)
//Bears Route
server.use('/api/bears', bearsRoute)

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
