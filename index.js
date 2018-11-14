const express = require("express");
const helmet = require("helmet");

const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// R O O T
server.get("/", (req, res) => {
  res.send("sup");
});

// G E T

server.get("/api/zoo", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

// P O S T
server.post("/api/zoo", (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into("zoos")
    .then(ids => res.status(201).json(ids))
    .catch(err =>
      res.status(500).json({ message: "There was a problem adding zoo.", err })
    );
});

// P U T
server.put("/api/zoo/:id", (req, res) => {
  const change = req.body;
  const { id } = req.params;

  db("zoos")
    .where({ id: id })
    .update(change)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// D E L E T E

server.delete("/api/zoo/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

const port = 9000;
server.listen(port, function() {
  console.log(`\n=== API Listening on port ${port} ===\n`);
});
