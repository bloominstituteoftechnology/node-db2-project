const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("../knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

// use statments
router.use(express.json());
router.use(helmet());

// routed endpoints

// get endpoint
router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get by id endpoint
router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => res.status(500).json(err));
});
