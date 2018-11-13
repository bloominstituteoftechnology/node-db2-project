const express = require('express');
const helmet = require('helmet');
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/zoos/:id", (req, res) => {
  const { zooId } = req.params;
  db("zoos")
    .where({ id: zooId })
    .then(zooInfo => res.status(200).json(zooInfo))
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/students", (req, res) => {
  const student = req.body;

  db("students")
    .insert(student)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: err })
    });
});

server.put("/api/students/:id", (req, res) => {
  const changes = req.body;
  const { studentId } = req.params;

  db("students")
    .where({ id: studentId })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 9000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
