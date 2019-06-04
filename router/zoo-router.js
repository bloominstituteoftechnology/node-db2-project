const express = require('express');
const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3', 
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.db3', 
    },
  };

  const db = knex(knexConfig);

  router.get("/", (req, res) => {
    db("zoos")
      .then(zoo => {
        res.status(200).json(zoo);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.get("/:id", (req, res) => {
    db("zoos")
      .where({ id: req.params.id })
      .first()
      .then(zoo => {
        if (zoo) {
          res.status(200).json(zoo);
        } else {
          res.status(404).json({ message: "no such id exists" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.post("/", (req, res) => {
    if (!req.body.name) {
      res.status(400).json({ msg: "please provide a name" });
    } else {
      db("zoos")
        .insert(req.body, "id")
        .then(ids => {
          db("zoos")
            .where({ id: ids[0] })
            .first()
            .then(zoo => {
              res.status(200).json(zoo);
            })
            .catch(err => {
              res.status(500).json(err);
            });
        })
        .call(err => {
          res.status(500).json(err);
        });
    }
  });



  router.put('/:id', (req, res) => {
    db('zoos')
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
        res.status(200).json({
        message: `${count} ${count > 1 ? "records" : "record"} updated`
         });
        
        } else {
          res.status(404).json({ message: 'this zoo does not found' });
        }
      })
      .catch(error => {
       
        res.status(500).json(error);
      });
  });


module.exports = router;