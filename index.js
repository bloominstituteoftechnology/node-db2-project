const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const server = express();
const zooRoute = require('./api/zooRoute.js')

server.use(express.json());
server.use(helmet());

/* ---- ZOO ENDPOINTS ----  */
server.use('/api/zoos/', zooRoute)

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});