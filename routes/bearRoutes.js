const express = require("express");
// knex
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: "The bears could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .then(bear => {
      if (bear.length === 0) {
        res
          .status(404)
          .json({ message: "The bear with the specified ID does not exist." });
      } else {
        return res.status(200).json({ bear });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The bear could not be retrieved." });
    });
});
// end GET

// start POST
router.post("/", (req, res) => {
  const bear = req.body;
  if (!bear.name) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the bear.",
    });
  } else {
    db("bears")
      .insert(bear)
      .into("bears")
      .then(bears => {
        res.status(201).json({ message: "Bear successfully added." });
      })
      .catch(err => {
        res.status(500).json({ error: "The bear could not be added." });
      });
  }
});
// end POST

// start DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id })
    .del()
    .then(bears => {
      if (bears === 0) {
        res.status(404).json({
          message: "The bear with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ message: "Bear removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The bear could not be removed." });
    });
});
// end DELETE

// start PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newBear = req.body.name;
  if (!newBear) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the bear.",
    });
  } else {
    db("bears")
      .where({ id })
      .update({ name: newBear })
      .then(bears => {
        res.status(200).json({ message: "Bear successfully modified." });
      })
      .catch(err => {
        res.status(500).json({ error: "The bear could not be updated." });
      });
  }
});
// end PUT
// /////// BEARS ENDPOINTS END /////////

module.exports = router;
