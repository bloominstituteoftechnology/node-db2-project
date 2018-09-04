const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile')

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('API is Running');
});

server.post('/api/zoos', (req, res) => {
  const name = req.body;
  console.log(name)
  db.insert(name)
  .into('zoos')
  .then(id => {
  res.status(201).json(id);
  })
  .catch(err => res.status(500).json(err));
  });


server.get('/api/zoos', (req,res) => {
  db('zoos')
  .then(zoo => {
  res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json(err));
  });


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
