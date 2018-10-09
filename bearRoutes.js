const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;
  const bear = { name };
  console.log(bear);
  db.insert(bear)
    .into("bear")
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json(err));
});

router.get("/", (req, res) => {
  db("bear")
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).send(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("bear")
    .where({ id })
    .first()
    .then(bear => {
      if (bear) {
        return res.status(200).json(bear);
      } else {
        res.status(404).json({ message: "Can't find this bear." });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("bear")
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const bear = { name };
  db("bear")
    .where({ id })
    .update(bear)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
