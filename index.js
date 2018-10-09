const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexconfig = require('./knexfile');
const db = knex('knexconfig.development');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('It works');
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
