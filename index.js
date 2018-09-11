const express = require('express');
const helmet = require('helmet');
const knex = require("knex");
const bearRoutes = require('./bears/bearRoutes.js');
const zooRoutes = require('./zoos/zooRoutes.js');

const dbconfig = require("./knexfile");
const db = knex(dbconfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/bears', bearRoutes);
server.use('api/zoos' , zooRoutes);

server.get('/', (req, res) => {
  res.send('API running...')
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


