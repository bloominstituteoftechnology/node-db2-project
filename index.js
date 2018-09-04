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
// GET
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
// end GET

// start POST
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the zoo.",
    });
  } else {
    db.insert(zoo)
      .into("zoos")
      .then(zoos => {
        res.status(201).json(zoos);
      })
      .catch(err => res.status(500).json(err));
  }
});
// end POST

// end endpoints
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
