const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// server sanity check
server.get("/", (req, res) => {
  res.send("API Running...");
});

// endpoints here
// post - create a new zoo in the zoos table
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  // insert into zoos
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// get - read the array of zoo objects
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .select("name")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
