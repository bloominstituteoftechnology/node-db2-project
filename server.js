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
        res.status(201).json({ success: `${name} created with id: ${id}` });
      })
      .catch(err => {
        res.status(500).json({ error: "problem adding the zoo" });
      });
  } else {
    res.status(422).json({ error: "Please pass in a name, man!" });
  }
});

server.get("/zoos", (req, res) => {
  knex("zoos")
    // .select()
    // .from("zoos")
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
        if (zoo.length) {
          res.status(200).json(zoo);
        } else {
          res.status(404).json({ message: `Cannot find zoo with id: ${id}` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Error getting zooos" });
      });
  } else {
    res.status(422).json({ error: "Please include an id number" });
  }
});

server.put("/zoos/:id", (req, res) => {
  const { id } = req.params;
  const updatedName = req.body.name;
  knex("zoos")
    .where({ id })
    .update("name", updatedName)
    .then(zoo => {
      knex("zoos")
        .where({ id })
        .then(zoo => {
          res.status(200).json(zoo);
        })
        .catch(err => {
          res.status(404).json({ msg: `Could not find zoo with id: ${id}` });
        });
    })
    .catch(err => {
      res.status(404).json({ msg: `Could not find zoo with id: ${id}` });
    });
});

server.delete("/zoos/:id", (req, res) => {
  const { id } = req.params;
  knex("zoos")
    .where({ id })
    .then(zoo => {
      if (zoo.length) {
        knex("zoos")
          .where({ id })
          .del()
          .then(success => {
            res
              .status(200)
              .json({ msg: `Zoo with id: ${id} successfully deleted` });
          })
          .catch(fail => {
            res
              .status(500)
              .json({ error: `Zoo with id: ${id} could not be deleted` });
          });
      } else {
        res.status(404).json({ msg: `Zoo with id : ${id} does not exist.` });
      }
    });
});

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
