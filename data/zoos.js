const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
  
router.post('/', (req, res) => {
const zoo = req.body;
if (!zoo.name) {
    res.status(400).json({ error: "Please provide a name for the zoo." })
} else
    db.insert(zoo)
    .into('zoos')
    .then(ids => {
    res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ error: "There was an error saving the zoo." }))
})

router.get('/', (req, res) => {
db('zoos')
.then(zoos => {
    res.status(200).json(zoos)
})
.catch(err => res.status(500).json(err));
})

router.get('/:id', (req, res) => {
const {id} = req.params;
db('zoos').where({ id: id })
.then(zoo => {
    if (zoo.length === 0) {
    res.status(404).json({ message: "The zoo with the specified ID does not exist." });
    } else 
    res.status(200).json(zoo);
})
.catch(err => res.status(500).json(err));
})

router.delete('/:id', (req, res) => {
const {id} = req.params;
db('zoos').where({ id: id }).del()
.then(count => {
    if (count) {
    res.status(204).end();
    } else {
    res.status(404).json({ message: "The zoo with the specified ID does not exist." });
    }
})
.catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
const {id} = req.params;
const zoo = req.body;
if (!zoo.name) {
    res.status(400).json({ error: "Please provide a name for the zoo." })
} else
    db('zoos').where({ id: id }).update(zoo)
    .then(count => {
    if (count) {
        res.status(200).json({ message: "The zoo was successfully updated." });
    } else {
        res.status(404).json({ message: "The zoo with the specified ID does not exist." });
    }
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;