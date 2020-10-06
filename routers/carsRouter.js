const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db.find()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  db.update(Number(req.params.id), req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  db.remove(Number(req.params.id))
    .then(res.status(200).json({ message: "car deleted" }))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
