const express = require("express");
const db = require("../database/dbconfig");
const router = express.Router();

router.get("/", (req, res) => {
  db("autoDealer")
    .then((autos) => {
      res.status(201).json(autos);
    })
    .catch((err) => {
      res.status(500).json({ message: "failed to retrieve data from server" });
    });
});

router.post("/", (req, res) => {
  db("autoDealer")
    .insert(req.body, "id")
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => {
      res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
