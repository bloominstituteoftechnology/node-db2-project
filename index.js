const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const knex = require('knex');
const knexDB = require('./knexfile');
const zooDB = knex(knexDB.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger('tiny'));

// endpoints here

server.get('/api/zoos', (req, res) => {
zooDB('zoos')
.then(zoos => {
  res.json(zoos);
})
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
