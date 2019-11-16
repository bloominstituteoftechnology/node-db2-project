const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .select("*")
    .then(carData => {
      res.status(200).json(carData);
    })
    .catch(err => {
      res.status(500).json({
        Message: "Problem with the database. "
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .select("*")
    .where({ id })
    .then(account => {
      if (account[0]) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        Message: "Database Problem",
        err
      });
    });
});

router.post("/", (req, res) => {
  const carInfo = req.body;
  db("cars")
    .insert(carInfo)
    .then(info => {
      res.status(201).json(info);
    })
    .catch(err => {
      res.status(500).json({
        Message: "Problem with the database. "
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("cars")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json({ message: "My friend, that ID is invalid." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Problem with the database. " });
    });
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;
  db('cars')
  .where({id})
  .del()
  .then(count => {
    count
    ? res.status(200).json({ deleted: count})
    : res.status(404).json({ message: "My friend, that ID is invalid."})
  })
  .catch(err => {
    res.status(500).json({message: "Problem with the database. "})
  })
});

module.exports = router;
