const express = require("express");
const zoosRouter = express.Router();
const bodyChecker = require('../data/middleware/bodyChecker')
const db = require("../data/dbConfig");

zoosRouter.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => res.status(500).json({ error }));
});

zoosRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

zoosRouter.post("/", bodyChecker, (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into("zoos")
    .then(zooId => {
      res.status(201).json(zooId);
    })
    .catch(error => res.status(500).json({ error }));
});

zoosRouter.put("/:id", bodyChecker, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("zoos")
    .where("id", "=", id)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

zoosRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = zoosRouter;
