const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
/*########################################### GET ###########################################*/
/************************ GET Zoo's ************************/
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

const port = 9001;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on power (port) level ${port} ===\n`);
});
