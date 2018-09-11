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
  res.send("API Running...");
});

server.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The  zoos information could not be retrieved" });
    });
});

server.get("/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id: id })
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The  zoos information could not be retrieved" });
    });
});

server.post("/zoos", (req, res) => {
  const zoo = req.body;
  if (zoo.name) {
    db.insert(zoo)
      .into("zoos")
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the zoo to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide name for the zoo."
    });
  }
});

server.put("/zoos/:id", (req, res) => {
  const zoo = req.body;
  const { id } = req.params;

  db("zoos")
    .where("id", "=", id)
    .update(zoo)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
