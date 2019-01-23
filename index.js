const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
// endpoints here

server.post("/api/zoos", (req, res) => {
  const newZoo = req.body;

  db.insert(req.body)
    .into("zoos")
    .then(ids => {
      console.log(ids);
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// Get endpoints
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// Curious if the catch() is still needed here, didn't add it because it seemed redundant
server.get("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "Couldn't find that zoo" });
      }
    });
});

//delete intellisense helped me find my method but I'm still unclear as to where it came from??

server.delete("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(value => {
      res.status(200).json(value);
    })
    .catch(err => res.status(500).json(err));
});

// put I feel the same way about then/catch here as above need to get some clarification

server.put("/api/zoos/:id", (req, res) => {
  const edits = req.body;

  db("zoos")
    .where({ id: req.params.id })
    .update(edits)
    .then(value => {
      if (value) {
        res.status(200).json(value);
      } else {
        res.status(404).json({ message: "Zoo not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
