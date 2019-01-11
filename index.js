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
 DB('zoos')
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
 DB('zoos')
 .where({ id })
 .then((rows) => {
  res
   .json(rows)
 })
 .catch(() => {
  res
   .json({error:  "There was an error retriving zoos from database."})
 })
})

server.post('/api/zoos', (req, res) => {
 const zoo = req.body
 if (zoo.name) {
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
 }
 else {
  res
   .json({error: "Name required to add zoo to database."})
 }
})

server.put('/api/zoos:id', (req, res) => {
 const zoo = req.body
 const { id } = req.params
 DB('zoos')
  .where({id: id})
  .update(zoo)
  .then((nums) => {
   res
    .json(nums)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error updating zoo in database."})
  })
})

server.delete('/api/zoos/:id', (req, res) => {
 const { id } = req.params.id
 DB('zoos')
 .where({ id })
 .del()
 .then((nums) => {
   res
    .json(nums)
 })
 .catch(() => {
  res
   .status(500)
   .json({error: "There was an error removing zoo from database."})
 })

})
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
