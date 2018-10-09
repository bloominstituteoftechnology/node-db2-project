const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

// use statments
router.use(express.json());
router.use(helmet());

// routed endpoints

// get endpoint
router.get("/", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// get by id endpoint
router.get("/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .first()
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => res.status(500).json(err));
});

// post endpoint
router.post("/", (req, res) => {
  const bear = req.body;
  if (!bear) {
    res.status(400).json({ message: "provide a bear name" });
  }
  db.insert(bear)
    .into("bears")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// put endpoint route
router.put("/:id", (req, res) => {
  const bear = req.body;
  console.log(bear);
  db("bears")
    .where({ id: req.params.id })
    .update(bear)
    .then(bear => {
      if (bear) {
        res.status(200).json({ message: "update completed successfully" });
      } else {
        res.status(404).json({ message: "there is no bear with this ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "update Faiure" });
    });
});

// delete endpoint route
router.delete("/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "there is no bear with this ID" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
