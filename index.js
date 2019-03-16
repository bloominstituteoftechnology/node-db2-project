const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// GET /api/zoos
  server.get('/', (req, res) => {
    res.send('api is running');
  })

//GET /api/zoos/:id

//POST /api/zoos
  server.post
//DELETE /api/zoos/:id

//PUT /api/zoos/:id

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
