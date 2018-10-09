const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

// endpoints here

// Server Test READ Endpoint
server.get('/', (request, response) => {
  response.send('Working');
})



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
