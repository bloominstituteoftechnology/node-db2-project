const express = require('express');
const helmet = require('helmet');
// const knex = require('knex');
const zoos = require('./endpoints/zooEndpoints');
const bears = require('./endpoints/bearEndpoints');

// const knexConfig = require('./knexfile.js');

// const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
// ZOO ENDPOINTS
server.use('/api/zoos', zoos)
//BEAR ENDPOINTS
server.use('/api/bears', bears);


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
