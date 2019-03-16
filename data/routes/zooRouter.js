const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const zooDB = knex(knexConfig.development);

router.get("/", (req, res) => {
    zooDB("zoos")
      .then(zoos => {
        res.json(zoos);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "Unable to retrieve list of zoos from the DB." });
      });
  });
  
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    zooDB("zoos")
      .where("id", id)
      .then(rows => {
        res.json(rows);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "Failed to find a zoo with this ID in the DB." });
      });
  });
  
  router.post("/", (req, res) => {
    const zoo = req.body;
    if (zoo.name) {
      zooDB("zoos")
        .insert(zoo)
        .then(ids => {
          res.status(201).json(ids);
        })
        .catch(() => {
          res
            .status(500)
            .json({ error: "Failed to insert the zoo into the database." });
        });
    } else {
      res.status(400).json({ error: "Name required to insert zoo into the DB." });
    }
  });
  
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const zoo = req.body;
  
    if (zoo.name) {
      zooDB("zoos")
        .where("id", id)
        .update(zoo)
        .then(zooCount => {
          res.status(200).json("zoo has been updated");
        })
        .catch(err => {
          res.status(500).json({ message: "Could not update zoo" });
        });
    } else {
      res.status(400).json({ message: "Missing name" });
    }
  });
  
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    zooDB("zoos")
      .where({ id: id })
      .del()
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: `404 - zoo with id ${id} not found.` });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  module.exports = router;