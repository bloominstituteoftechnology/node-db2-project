const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile.js');


const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (zoo.name) {
    db('zoos').insert(zoo)
    .then(id => {
      res
        .status(201)
        .json(id)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: 'The zoo could not be inserted.'});
    });
  }
  else {
    res
      .status(400)
      .json({message: 'Please include the zoo name.'});
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
