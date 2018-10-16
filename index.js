const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

//endpoints here

//sanity check endpoint
server.get("/", (req, res) => {
  res.send("It's Alive");
});

// Get All Zoos
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//create zoo POST request
server.post("/api/zoos", (req, res) => {
  const name = req.body;

  db.insert(name)
    .into("zoos")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete zoo DELETE request

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
