const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/", (req, res) => {
  res.send("API running....");
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The zoos information could not be retrieved" });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The zoos information could not be retrieved" });
    });
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The zoo information could not be retrieved" });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The zoo information could not be updated" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
