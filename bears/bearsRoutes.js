const express = require("express");
const bearsRouter = express.Router();
const bodyChecker = require('../data/middleware/bodyChecker')
const db = require("../data/dbConfig");

bearsRouter.get("/", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

bearsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

bearsRouter.post("/", bodyChecker, (req, res) => {
  const bear = req.body;
  db.insert(bear)
    .into("bears")
    .then(bearId => {
      res.status(201).json(bearId);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

bearsRouter.put("/:id", bodyChecker, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("bears")
    .update(changes)
    .where({ id })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

bearsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = bearsRouter;
