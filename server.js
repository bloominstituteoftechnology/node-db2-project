const express = require("express");
const bodyParser = require("body-parser");

const knex = require("./database/db");
const server = express();

server.use(bodyParser.json());

// endpoints here
server.get("/", (req, res) => {
  res.status(200).json({ api: "Running....." });
});

server.post("/zoos", (req, res) => {
  const { name } = req.body;
  if (name) {
    knex
      .insert({ name })
      .into("zoos")
      .then(id => {
        res.status(200).json({ success: `${name} created with id: ${id}` });
      })
      .catch(err => {
        res.status(500).json({ error: "problem adding the zoo" });
      });
  } else {
    res.status(422).json({ error: "Please pass in a name, man!" });
  }
});

server.get("/zoos", (req, res) => {
  knex
    .select()
    .from("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "No zoos found or error getting zoos" });
    });
});

server.get("/zoos/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    knex("zoos")
      .where({ id })
      .select("name")
      .then(zoo => {
        res.status(200).json(zoo[0].name);
      })
      .catch(err => {
        res.status(500).json({ error: "Cannot find a zoo with that id." });
      });
  } else {
    res.status(422).json({ error: "Please include an id number" });
  }
});

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
