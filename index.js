const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const server = express();
const db = knex(knexConfig.development);
server.use(express.json());
server.use(helmet());

// endpoints here

//========================================================================== Sanity Check <----
server.get("/", (req, res) => {
  res.json({ api: "running" });
});

//========================================================================== Get Endpoints <----
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

//========================================================================== Post <----
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  console.log(zoo);
  db("zoos")
    .insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ message: "error creating zoo" }));
});

//========================================================================== Put <----
server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  console.log(id, changes);
  db("zoos")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => {
      res.status(500).json(err);
      error.log(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
