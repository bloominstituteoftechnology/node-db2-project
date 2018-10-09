const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();


server.use(express.json());
server.use(helmet());

// endpoints here:
server.get('/api/zoos', (req, res) => {
  db
      .select()
      .then(response => {
          res.status(200).json(response);
      })
      .catch(err => {
          res.status(500).json(err)
      })
});


// Server Listen:
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
