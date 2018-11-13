const express = require('express');
const helmet = require('helmet');
const knex = require("knex");
const knexConfig = require("./knexfile")

const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({error: err}))
})

server.get("/api/zoos/:id", (req, res) => {
const {id} = req.params;

  db("zoos")
    .where({id})
    .then(zoo => zoo[0] === undefined ? 
      res.status(400).json({error: "Please enter a valid id"}) : 
      res.status(200).json(zoo))
    .catch(err => res.status(500).json({error: err}))
})

server.post("/api/zoos", (req, res) => {
  const changes = req.body;

  if (changes.name === "" || changes.name === undefined) {
    return res.status(400).json({error: "Please make sure the zoo name is indexed."})
  }

  db("zoos")
    .insert(changes)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({errorMessage: err}))
})

server.put("/api/zoos/:id", (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  if (changes.name === "" || changes.name === undefined) {
    return res.status(400).json({error: "Please make sure the zoo name is indexed."})
  }

  db("zoos")
    .where({id})
    .update(changes)
    .then(count => count === 0 ? 
      res.status(400).json({error: "Please enter a valid id"}) :
      res.status(201).json(count))
    .catch(err => res.status(500).json({errorMessage: err}))
})

server.delete("/api/zoos/:id", (req, res) => {
  const {id} = req.params;

  db("zoos")
    .where({id})
    .del()
    .then(count => count === 0 ? 
      res.status(400).json({error: "Please enter a valid id"}) :
      res.status(200).json(count))
    .catch(err => res.status(500).json({errorMessage: err}))
})

const port = 9001;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
