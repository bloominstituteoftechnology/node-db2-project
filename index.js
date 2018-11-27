const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile')

const helmet = require('helmet');

const db = knex(knexConfig.development);

const server = express();


server.use(express.json());

// endpoints here

// POST

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db("zoos")
   .insert(zoo)
   .then(ids => {
     res.status(201).json(ids)
   })
   .catch(err => {
     res.status(500).json({ error: "Error posting the zoo", err })
   })
})

// GET

server.get("/api/zoos/", (req, res) => {
  db("zoos")
   .then(zoos => {
     res.status(200).json(zoos)
   })
   .catch(err => {
     res.status(500).json({ error: "Error getting the zoos", err })
   })
})

// GET BY ID

server.get("/api/zoos/:id", (req, res) => {
const {id} = req.params

  db("zoos")
   .where({id:id})
   .then(name => {
     res.status(200).json(name)
   })
   .catch(err => {
     res.status(500).json({ error: "Error getting the zoos", err })
   })
})

// // DELETE

server.delete("/api/zoos/:id", (req, res) => {
  const {id} = req.params

  db("zoos")
   .where(id)
   .del()
   .then(ids => {
     res.status(200).json(ids)
   })
   .catch(err => {
     res.status(500).json({ error: "Error updating the zoo", err })
   })
})

// // PUT

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body
  const {id} = req.params

  db("zoos")
   .where({id:id})
   .update(changes)
   .then(count => {
     res.status(200).json({count})
   })
   .catch(err => {
     res.status(500).json({ error: "Error updating the zoo", err })
   })
})



console.log('\ntesting')

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
