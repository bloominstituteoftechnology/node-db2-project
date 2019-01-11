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
 DB
 .select()
 .then(rows => {
  res
   .json(rows)
 })
 .catch(() => {
  res
   .status(500)
   .json({error: "Was un-able to retrieve list of Zoos."})
 })
})

server.get('/api/zoos/:id', (req, res) => {
 const { id } = req.params.id
 DB
 .select()
 .where()
})

server.post('/api/zoos', (req, res) => {
 const zoo = req.body
 const { name } = req.params
 DB('zoos')
  .insert(zoo)
  .then((ids) => {
   res
    .status(201)
    .json(ids[0])
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error adding zoo to database."})
  })
})

server.put('/api/zoos:id', (req, res) => {
 const zoo = req.body
})

server.delete('/api/zoos/:id', (req, res) => {
 const { id } = req.params.id

})
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
