const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// zoos

server.get("/api/animals", (req, res) => {
  db("zoos")
    .then(animals => res.status(200).json(animals))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/animals/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id: id })
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/animals", (req, res) => {
  const animal = req.body;
  db("zoos")
    .insert(animal)
    .then(id => {
      res.status(201).json(`Added animal with id of ${id}`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting", err });
    });
});

server.put("/api/animals/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("zoos")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/animals/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// bears

server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id: id })
    .then(bear => res.status(200).json(bear))
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/bears", (req, res) => {
  const bear = req.body;
  db("bears")
    .insert(bear)
    .then(id => {
      res.status(201).json(`Added bear with id of ${id}`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting", err });
    });
});

server.put("/api/bears/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("bears")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
