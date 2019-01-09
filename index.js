const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const port = 3300;
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
