const express = require('express');
const knex = require("knex");

const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;
  const zoo = { name };
  db.insert(zoo)
    .into("zoos")
    .then(postedZoo => res.status(201).json(postedZoo))
    .catch(err => res.status(500).json(err));
});

router.get("/", (req, res) => {
  db("zoos")
    .then(courses => res.status(200).json(courses))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .first()
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const zoo = { name };
  db("zoos")
    .where({ id })
    .first()
    .update(zoo)
    .then(updatedZoo => res.status(200).json(updatedZoo))
    .catch(err => res.status(500).json(err));
});

module.exports = router;