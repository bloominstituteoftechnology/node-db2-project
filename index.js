const express = require('express');
const helmet = require('helmet');

const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());
const zooRouter = require('./data/routes/zooRouter');
const bearRouter = require('./data/routes/bearRouter');

// endpoints here

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);

const port = 9090;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});