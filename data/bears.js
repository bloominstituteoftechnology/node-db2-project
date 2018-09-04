const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

router.post('/', (req, res) => {
    const bear = req.body;
    if (!bear.name) {
      res.status(400).json({ error: "Please provide a name for the bear." })
    } else
      db.insert(bear)
      .into('bears')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json({ error: "There was an error saving the bear." }))
  })
  
router.get('/', (req, res) => {
db('bears')
.then(bears => {
    res.status(200).json(bears)
})
.catch(err => res.status(500).json(err));
})

router.get('/:id', (req, res) => {
const {id} = req.params;
db('bears').where({ id: id })
.then(bear => {
    if (bear.length === 0) {
    res.status(404).json({ message: "The bear with the specified ID does not exist." });
    } else 
    res.status(200).json(bear);
})
.catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
const {id} = req.params;
db('bears').where({ id: id }).del()
.then(count => {
    if (count) {
    res.status(204).end();
    } else {
    res.status(404).json({ message: "The bear with the specified ID does not exist." });
    }
})
.catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
const {id} = req.params;
const bear = req.body;
if (!bear.name) {
    res.status(400).json({ error: "Please provide a name for the bear." })
} else
    db('bears').where({ id: id }).update(bear)
    .then(count => {
    if (count) {
        res.status(200).json({ message: "The bear was successfully updated." });
    } else {
        res.status(404).json({ message: "The bear with the specified ID does not exist." });
    }
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;