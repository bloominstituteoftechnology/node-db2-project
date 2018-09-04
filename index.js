const express = require("express");
const helmet = require("helmet");
// knex
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);
// 2nd database
const bearDBConfig = require("./knexfileBears");
const bearDB = knex(bearDBConfig.development);
// end 2nd database

const server = express();

server.use(helmet());
server.use(express.json());

// endpoints here
// GET
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "The zoos could not be retrieved." });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .then(zoo => {
      if (zoo.length === 0) {
        res
          .status(404)
          .json({ message: "The zoo with the specified ID does not exist." });
      } else {
        return res.status(200).json({ zoo });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The zoo could not be retrieved." });
    });
});
// end GET

// start POST
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the zoo.",
    });
  } else {
    db("zoos")
      .insert(zoo)
      .into("zoos")
      .then(zoos => {
        res.status(201).json(zoos);
      })
      .catch(err => {
        res.status(500).json({ error: "The zoo could not be added." });
      });
  }
});
// end POST

// start DELETE
server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(zoos => {
      if (zoos === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ message: "Zoo removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The zoo could not be removed." });
    });
});
// end DELETE

// start PUT
server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  if (!newName) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the zoo.",
    });
  } else {
    db("zoos")
      .where({ id })
      .update({ name: newName })
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        res.status(500).json({ error: "The zoo could not be updated." });
      });
  }
});
// end PUT

// end endpoints
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
