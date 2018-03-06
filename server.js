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

server.post("/bears", (req, res) => {
  const { zooId, species, latinName } = req.body;
  const bear = { zooId, species, latinName };
  if (!zooId) {
    res.status(422).json({ err: "Include a zooId" });
  } else if (!species) {
    res.status(422).json({ err: "include a species name" });
  } else if (!latinName) {
    res.status(422).json({ err: "include a latinName" });
  } else {
    knex
      .insert(req.body)
      .into("bears")
      .then(id => {
        res.status(200).json(id);
      })
      .catch(err => {
        res
          .status(500)
          .json({ err: "error adding. did you include a valid zooId" });
      });
  }
});

server.get("/bears", (req, res) => {
  knex("bears")
    .then(bears => {
      if (bears.length) {
        res.status(200).json(bears);
      } else {
        res.status(404).json({ msg: "no bears found" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "error getting the bears" });
    });
});

server.get("/bears/:id", (req, res) => {
  const { id } = req.params;
  knex("bears")
    .where({ id })
    .then(bear => {
      if (bear.length) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ msg: `Bear with id: ${id} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "err gettign the bear" });
    });
});

server.put("/bears/:id", (req, res) => {
  const { id } = req.params;
  const updatedBear = req.body;
  knex("bears")
    .where({ id })
    .then(bear => {
      if (bear.length) {
        knex("bears")
          .where({ id })
          .update(updatedBear)
          .then(newBear => {
            knex("bears")
              .where({ id })
              .then(bear => {
                res.status(200).json(bear);
              })
              .catch(err => {
                res.status(404).json({ msg: "cannot find bear" });
              });
          })
          .catch(err => {
            res.status(500).json({ err: "Error updating bear" });
          });
      } else {
        res.status(404).json({ msg: `Bear with id: ${id} not found` });
      }
    })
    .catch(err => {
      res.send(err);
    });
});

server.delete("/bears/:id", (req, res) => {
  const { id } = req.params;
  knex("bears")
    .where({ id })
    .then(bear => {
      if (bear.length) {
        knex("bears")
          .where({ id })
          .del()
          .then(succ => {
            res.status(200).json({ msg: "bear gone" });
          })
          .catch(err => {
            res.status(500).json({ msg: "error deleting bear" });
          });
      } else {
        res.status(404).json({ msg: "can't find the homie" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Error finding bear to delete" });
    });
});

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
