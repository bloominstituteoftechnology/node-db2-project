const express = require("express");
const knex = require("knex");

const knexfile = require("../knexfile.js");

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

module.exports = router;
