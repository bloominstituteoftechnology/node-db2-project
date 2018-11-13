const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// POST Request

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  if (zoo.name === "") {
    res.status(400).json({ message: "Please include a name" });
  } else {
    db("zoos")
      .insert(zoo)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({ message: "There was an error posting to zoos" });
      });
  }
});

// GET request for all zoos

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error getting the data" });
    });
});

// GET request for individual zoos

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where("id", id)
    .then(zoos => {
      if (!zoos.length) {
        res
          .status(404)
          .json({ message: "Could not find zoo with specified id" });
      } else {
        res.status(200).json(zoos);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error getting the data" });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (changes.name === "") {
    res.status(400).json({ message: "Please include a name" });
  } else {
    db("zoos")
      .where({ id })
      .update(changes)
      .then(count => {
        if (!changes.length) {
          res
            .status(404)
            .json({ message: "Could not find zoo with specified id" });
        } else {
          res.status(200).json({ count });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error updating the zoo" });
      });
  }
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "Could not find zoo with specified id" });
      } else {
        res.status(200).json({ count });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error deleting the zoo" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
