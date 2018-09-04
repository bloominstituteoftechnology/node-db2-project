const express = require("express");
const helmet = require("helmet");
// knex
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// endpoints here
server.get("/api/zoos", (req, res) => {
  // res.send("Get request working");
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "The zoos could not be retrieved." });
    });
});

// end endpoints
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
