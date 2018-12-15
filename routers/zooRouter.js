const zooDb = require("../data/helpers/zooDb");

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  zooDb
    .get()
    .then(zoos => {
      zoos[0] ? res.json(zoos) : res.status(400).json({error: "there are no zoos in our directory"})
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve zoos" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  zooDb
    .get(id)
    .then(zoo => {
      if (zoo[0]) {
        res.json(zoo);
      } else {
        res.status(404).json({ error: "zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "zoo could not be retrieved." });
    });
});

module.exports = router;