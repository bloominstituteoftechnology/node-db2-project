const express = require("express");

const zoos = require("./zoosModel.js");

const router = express.Router();

//=============== ENDPOINTS =============== //

// get a list of zoos
router.get("/", (req, res) => {
  zoos
    .find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// create a zoo
router.post("/", (req, res) => {
  const zoo = req.body;

  zoos
    .add(zoo)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
