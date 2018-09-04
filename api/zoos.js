const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();

//zoo endpoints

//GET all zoos
router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

//GET zoo by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .then(zoo => zoo.length ?
              res.status(200).json(zoo[0]) :
              res.status(404).json({ message: "No zoo with that id" })
          )
    .catch(err => res.status(500).json(err));
});

//GET bears by zoo id
router.get('/:id/bears', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ zoo_id: id })
      .then(bears => bears.length ?
                      res.status(200).json(bears) :
                      res.status(404).json({ message: "No bears found in that zoo" }))
      .catch(err => res.status(500).json(err));
})

//POST a new zoo
router.post('/', (req, res) => {
  const { name } = req.body;
  if(!name) return res.status(422).json({ message: "A name is required for that operation" });

  db
    .insert({ name })
    .into('zoos')
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));

});

//DELETE zoo by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(delZoo => res.status(200).json(delZoo))
    .catch(err => res.status(500).json(err));
});

//PUT (Update) a zoo by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if(!name) return res.status(422).json({ message: "A name is required for that operation" });

  db('zoos')
    .where({ id })
    .update({ name })
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
