const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbconfig = require('./knexfile')

const server = express();
const db = knex(dbconfig.development)

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) =>{

})

server.post('/api/zoos',(req, res) =>{

})

server.get('/api/zoos/:id',(req, res) =>{

})

server.delete('/api/zoos/:id',(req, res) =>{

})

server.put('/api/zoos/:id',(req, res) => {

})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
