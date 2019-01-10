const express = require('express');
const helmet = require('helmet');
const logger = require("morgan")
const knex = require("knex")
const knexDB = require("./knexfile")
const DB = knex(knexDB.development)

const server = express();

server.use(
 express.json(),
 helmet(),
 logger('tiny')
)

// endpoints here

const port = process.env.port || 3300;

server.get('/api/zoos', (req, res) => {
 const zoo = req.body
 DB
 .select()
 .then(rows => {
  res
   .json(rows)
 })
})

server.get('/api/zoos/:id', (req, res) => {
 const zoo = req.body
})

server.post('/api/zoos', (req, res) => {
 const zoo = req.body
 DB


})

server.put('/api/zoos:id', (req, res) => {
 const zoo = req.body
})

server.delete('/api/zoos/:id', (req, res) => {
 const zoo = req.body
 
})
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
