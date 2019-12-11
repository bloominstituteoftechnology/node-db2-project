const express = require("express");

const db = require("../data/dbConfig");

// const knex = require("knex");
// const knexConfig = require("../knexfile.js");
// const db = knex(knexConfig.development);

// import middleware
const validateId = require("../middleware/validateId.js");
const validateCar = require("../middleware/validateCar.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to retrieve cars." });
    });
});

router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to retrieve car." });
    });
});

router.post("/", validateCar, (req, res) => {
  const newCar = req.body;
  db("cars")
    .insert(newCar)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(car => {
          res.status(200).json(car);
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to store car." });
    });
});

router.put("/:id", validateId, (req, res) => {
  const changes = req.body;
  db("cars")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to update car." });
    });
});

router.delete("/:id", validateId, (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to delete car." });
    });
});

module.exports = router;
