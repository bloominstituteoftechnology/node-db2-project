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

// post endpoint
router.post("/", (req, res) => {
  const zoo = req.body;
  if (!zoo) {
    res.status(400).json({ message: "provide a zoo name" });
  }
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// put endpoint route
router.put("/:id", (req, res) => {
  const zoo = req.body;
  console.log(zoo);
  db("zoos")
    .where({ id: req.params.id })
    .update(zoo)
    .then(zoo => {
      if (zoo) {
        res.status(200).json({ message: "update completed successfully" });
      } else {
        res.status(404).json({ message: "there is no zoo with this ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "update Faiure" });
    });
});

// delete endpoint route
router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "there is no zoo with this ID" });
      }
    })
    .catch(err => res.status(500).json(err));
});
