const express = require("express");
const router = express.Router();
const zoos = require("./zoosModel.js");


router.get("/", (req, res) => {
    zoos.find()
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The zoos information could not be retreived" });
      });
  });
  
  router.get("/:id", (req, res) => {
    zoos.find(req.params.id)
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The zoos information could not be retrieved" });
      });
  });
  
  router.post("/", (req, res) => {
    if (req.body.name.length < 128) {
      zoos.add(req.body)
        .then(zoos => {
          res.status(200).json(zoos);
        })
        .catch(err => {
          console.log("error", err);
          res
            .status(500)
            .json({ error: "The zoos information could not be posted" });
        });
    } else {
      res.status(401).json({ error: "Must be under 128 characters." });
    }
  });
  
  router.put("/:id", (req, res) => {
    zoos.update(req.params.id, req.body)
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The zoo cannot be updated." });
      });
  });
  
  router.delete("/:id", (req, res) => {
    zoos.remove(req.params.id)
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The zoo cannot be deleted." });
      });
  });
  
  
  module.exports = router;