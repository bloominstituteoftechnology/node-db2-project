const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.json('Home');
});

server.get('/api/animals', (req, res) => {
  db('zoos')
  .select('name')
  .then(names => {
    console.log(names)
    res.status(200).json(names)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
