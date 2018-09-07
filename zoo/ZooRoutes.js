const express = require("express");
const knex = require("knex");

const router = express.Router();

const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

router.post("/", (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(row => {
      if (row.length < 1) {
        res.status(404).json({ message: "Item does not exist" });
      }
      res.status(200).json(row);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const zoo = req.body;
  db("zoos")
    .where({ id: req.params.id })
    .update(zoo)
    .then(res => {
      if (!res) {
        res.status(404).json({ message: "Item does not exist" });
      }
      res.status(200).json({ id: req.params.id, name: zoo.name });
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .delete()
    .then(item => {
      if (!item) {
        res.status(404).json({ message: "That ID does not exist" });
      }
      res.status(200).json({ id: req.params.id });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
