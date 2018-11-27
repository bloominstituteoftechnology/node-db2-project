const express = require('express');
const knex = require('knex')
const helmet = require('helmet');

//connection to the database
const knexConfig = require('./knexfile.js')

const db = knex(knexConfig.development)
//end connection to db code

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  
  db('zoos')
    .insert(zoo)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(error => {
      res.status(500).json({message: 'Error inserting', error});
    });
});

/* server.post('/api/zoos', (req, res) => {
  
})

server.post('/api/zoos', (req, res) => {
  
})

server.post('/api/zoos', (req, res) => {
  
}) */

server.get('/', (req, res) => {
  res.json({ api : 'running!' })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
