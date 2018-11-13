//bringing in dependencies
const express = require('express');
const helmet = require('helmet');

//bringing in Knex to connect and access database
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);


//making the server use the dependencies we brought in
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here


const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
