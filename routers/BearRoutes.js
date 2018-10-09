const express = require("express");

const router = express.Router();

const db = require("../data/BearDb.js");

//GET all records in DB
router.get("/", (req, res) => {
  db.find()
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

//GET specific record
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "There was an error with the request" });
  }
  db.findById(id)
    .then(bear => {
      if (bear === undefined) {
        res
          .status(500)
          .json({ error: "There was an error retrieving the record" });
      }
      res.status(200).json(bear);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error retrieving the record" })
    );
});

//POST new record
router.post("/", (req, res) => {
  const newBear = req.body;
  if (!newBear) {
    res.status(400).json({ error: "There was an error with the request" });
  }
  db.insert(newBear)
    .then(count => {
      if (!count || count === 0) {
        res.status(400).json({ error: "There was an error adding the record" });
      }
      res.status(201).json({ message: "New record was added" });
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error adding the record" })
    );
});

//Update existing record
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const bear = req.body;
  if (!bear || !id) {
    res.status(400).json({ error: "There was an error with the request" });
  }
  db.update(id, bear)
    .then(count => res.status(200).json({ message: "Record was updated" }))
    .catch(err =>
      res.status(500).json({ error: "There was an error updating the record" })
    );
});

//DELETE existing record
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "There was an error with the request" });
  }
  db.remove(id)
    .then(count => {
      if (!count || count === 0) {
        res
          .status(400)
          .json({ error: "There was an error removing the record" });
      } else {
        res.status(200).json({ message: "Record was removed" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error removing the record" })
    );
});

module.exports = router;
