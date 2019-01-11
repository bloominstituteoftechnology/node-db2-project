const express = require('express');
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {

})

server.get('/api/zoos', (req, res) => {

})

server.get('/api/zoos/:id', (req, res) => {

})

server.delete('/api/zoos/:id', (req, res) => {

})

server.put('/api/zoos/:id', (req, res) => {
  
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
