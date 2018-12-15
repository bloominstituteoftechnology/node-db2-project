const express = require("express");
const knex = require("knex"),
  dbConfig = require("../../knexfile"),
  db = knex(dbConfig.development);

const router = express.Router();

// ~~~~~~ START BEARS CRUD ~~~~~~~

// ~~~~~ POST ~~~~~
router.post("/api/animals/bears", (req, res) => {
  const { bear } = req.body;
  if (!bear.name.length) {
    return res.json({
      error: "Could Not Create New Bear, please add a name to bear."
    });
  }
  db("bears")
    .insert(bear)
    .then(newBear => {
      res.status(201).json({ newBear });
    })
    .catch(err => {
      res.status(500).json({ error: "Could Not create new bear, try again." });
    });
});

// ~~~~ GET ~~~~~
router.get("/api/animals/bears", (req, res) => {
  db("bears")
    .then(bears => {
      if (bears.length) {
        res.json({ bears });
      } else {
        res
          .status(404)
          .json({ error: "No bears exist, please add a bear first." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Please check your connection and try again." });
    });
});

// ~~~~~ GET BEAR BY ID ~~~~~
router.get("/api/animals/bears/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where("id", id)
    .then(bear => {
      if (bear.length) {
        res.json({ bear });
      } else {
        res
          .status(404)
          .json({ error: "Bear does not exist, please create this bear!" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Please check your connect so you can check out this bear."
      });
    });
});

// ~~~~~ DELETE a bear ~~~~~
router.delete("/api/animals/bears/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where("id", id)
    .del()
    .then(count => {
      if (count) {
        res.json({ count });
      } else {
        res
          .status(400)
          .json({ error: "Something went wrong, please try again." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Make sure you have a connection and try again." });
    });
});

// ~~~~~ UPDATE A BEAR ~~~~~
router.put("/api/animals/bears/:id", (req, res) => {
  const { id } = req.params;
  const { bear } = req.body;

  db("bears")
    .where("id", id)
    .update(bear)
    .then(updated => {
      if (updated) {
        res.json({ updated });
      } else {
        res.status(400).json({ error: "Bear was not deleted, try again." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Check your connection, and attempt to delete bear again."
      });
    });
});

module.exports = router;
