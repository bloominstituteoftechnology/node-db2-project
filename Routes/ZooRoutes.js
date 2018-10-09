const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
