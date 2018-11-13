const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res) => {
  res.send("Welcome!");
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get("/api/zoos/:id", (req, res) => {
  db("zoo")
    .where({ id: req.params.id })
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(zoo));
});

server.post("/api/zoos", (req, res) => {
  db.insert(req.body)
    .into("zoos")
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json(err));
});

server.put("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where("id", "=", req.params.id)
    .update(req.body)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

server.delete("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
