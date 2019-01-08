const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;

server.post('./data/lambda.sqlite3', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: 'Failed to insert new zoo'})
  })
})

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});