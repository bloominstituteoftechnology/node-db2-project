const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile.js')
const server = express();
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());

// endpoints here


const PORT = 4444;

server.put('/api/zoos', (req,res) => {

})

server.put('/api/zoos:id', (req,res) => {
  
})

server.post('/api/zoos', (req,res) => {
  const animal = req.body;
  db('zoos').insert(animal)
  .then (ids => {
    res.status(201).json(ids)
  })
  .catch(err => {
    res.status(500).json({err: 'Failed to insert animal!'})
  })
})

server.delete('/api/zoos:id', (req,res) => {
  
})

server.listen(PORT, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
