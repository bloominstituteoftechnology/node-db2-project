const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();

//zoo endpoints

//GET all zoos
router.get('/', (req, res) => {
  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

//GET zoo by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id })
    .then(bear => bear.length ?
              res.status(200).json(bear[0]) :
              res.status(404).json({ message: "No bear with that id" })
          )
    .catch(err => res.status(500).json(err));
});

//POST a new zoo
router.post('/', (req, res) => {
  const { name, zoo_id } = req.body;

  db
    .insert({ name, zoo_id })
    .into('bears')
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));

});

//DELETE zoo by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id })
    .del()
    .then(delBear => res.status(200).json(delBear))
    .catch(err => res.status(500).json(err));
});

//PUT (Update) a zoo by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db('bears')
    .where({ id })
    .update({ name })
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
