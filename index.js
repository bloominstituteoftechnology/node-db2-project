const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();
server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .select("*")
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => res.status(500).json(err));
});

server.post("/api/zoos", (req, res) => {
  const name = req.body;
  console.log(name);
  db.insert(name)
    .into("zoos")
    .then(names => {
      res.status(201).json(names);
    })
    .catch(err => res.status(500).json(err));
});

server.put("/api/zoos/:id", (req, res) => {
  const name = req.body;
  const id = req.params.id;
  db("zoos")
    .where("id", "=", id)
    .update(name)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
