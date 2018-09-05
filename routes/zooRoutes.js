const express = require("express");
// knex
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

const router = express.Router();

// GET
router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "The zoos could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .then(zoo => {
      if (zoo.length === 0) {
        res
          .status(404)
          .json({ message: "The zoo with the specified ID does not exist." });
      } else {
        return res.status(200).json({ zoo });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The zoo could not be retrieved." });
    });
});
// end GET

// start POST
router.post("/", (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the zoo.",
    });
  } else {
    db("zoos")
      .insert(zoo)
      .into("zoos")
      .then(zoos => {
        res.status(201).json({ message: "Zoo successfully added." });
      })
      .catch(err => {
        res.status(500).json({ error: "The zoo could not be added." });
      });
  }
});
// end POST

// start DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(zoos => {
      if (zoos === 0) {
        res.status(404).json({
          message: "The zoo with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ message: "Zoo removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The zoo could not be removed." });
    });
});
// end DELETE

// start PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  if (!newName) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the zoo.",
    });
  } else {
    db("zoos")
      .where({ id })
      .update({ name: newName })
      .then(zoos => {
        res.status(200).json({ message: "Zoo successfully modified." });
      })
      .catch(err => {
        res.status(500).json({ error: "The zoo could not be updated." });
      });
  }
});
// end PUT

module.exports = router;
