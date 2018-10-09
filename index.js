const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.post("/api/zoos", (req, res) => {
  const { name } = req.body;
  const zoo = { name };
  db.insert(zoo)
    .into('zoos')
    .then(postedZoo => res.status(201).json(postedZoo))
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(courses => res.status(200).json(courses))
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({id})
    .first()
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({id})
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const zoo = { name };
  db('zoos')
    .where({id})
    .first()
    .update(zoo)
    .then(updatedZoo => res.status(200).json(updatedZoo))
    .catch(err => res.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
