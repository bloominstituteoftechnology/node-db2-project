const knex = require('knex');
const express = require('express');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
  db('bears')
  .then(bears => res.status(200).json(bears))
  .catch(err => res.status(500).json({message: 'There was an error retrieving the bears information'}))
})

router.get('/:id', (req, res) => {
  db('bears')
  .where({ id: req.params.id })
  .first()
  .then(bear => {
    if (bear) {
      res.status(200).json(bear)
    } else {
      res.status(404).json({ message: 'A bear with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error retrieving the information for that bear' }))
})

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: 'The request is missing required information: name of bear' })
  } else {
      db('bears')
      .insert(req.body)
      .into('bears')
      .then(id => {
        res.status(201).json(id)
    })
    .catch(err => res.status(500).json({ message: 'The bear record could not be created.'}))
  }

})

router.delete('/:id', (req, res) => {
  db('bears')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} records deleted` })
      } else {
        res.status(404).json({ message: 'A bear with that ID could not be found' })
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an error accessing the router' }))
})

router.put('/:id', (req, res) => {
  db('bears')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if (count) {
      res.status(200).json({ message: 'The bear information has been updated' })
    } else {
      res.status(404).json({ message: 'A bear with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})

 module.exports = router;
