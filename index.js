const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
const bearRoutes = require('./Bears/bearRoutes');
const zooRoutes = require('./Zoos/zooRoutes');

// https://github.com/LambdaSchool/db-zoos/pull/56

server.use(express.json());
server.use(helmet());

server.use('/zoos', zooRoutes);
server.use('/bears', bearRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
