const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);
const port = 3300;

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res)=>{
  db.('')
})

server.get('/api/zoos/:id', (req, res)=>{
  
})

server.post('/api/zoos', (req, res)=>{
  
})

server.put('/api/zoos/:id', (req, res)=>{
  
})

server.delete('/api/zoos/:id', (req, res)=>{
  
})


server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
