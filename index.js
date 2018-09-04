const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!req.name) {
    res.status(400).json({ message: "Need to provide a name for the zoo" });
  }
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(row => {
      if (row.length < 1) {
        res.statusZ(404).json({ message: "Item does not exist" });
      }
      res.status(200).json(row);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(3300, console.log("\n ==== WORKING ==== \n"));
