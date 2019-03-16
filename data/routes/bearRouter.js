const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const zooDB = knex(knexConfig.development);

router.get("/", (req, res) => {
    zooDB("bears")
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
  
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    zooDB("bears")
      .where("id", id)
      .then(bear => {
        if (bear.length) {
          res.status(200).json(bear);
        } else {
          res.status(404).json({
            error: "The bear with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.post("/", (req, res) => {
    const bear = req.body;
    if (!bear.name) {
      res
        .status(404)
        .json({ error: "Please provide complete bear information." });
      return;
    }
    zooDB("bears")
      .insert(bear)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error adding bear to server", err });
      });
  });
  
  router.put("/:id", (req, res) => {
    const bear = req.body;
    const { id } = req.params;
    if (!bear.name || !id) {
      res
        .status(404)
        .json({ error: "Please provide bear information and/or ID." });
      return;
    }
    zooDB("bears")
      .where("id", id)
      .update(bear)
      .then(id => {
        if (id) {
          res.status(201).json(id);
        } else {
          res
            .status(404)
            .json({ error: "The bear with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The bear could not be updated", err });
      });
  });
  
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    zooDB("bears")
      .where("id", id)
      .del()
      .then(count => {
        if (count) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({ error: "The bear with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The bear could not be removed" });
      });
  });

  module.exports = router;