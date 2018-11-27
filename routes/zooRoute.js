const knex = require('knex');
const express = require('express');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
  db('zoos')
  .then(zoos => res.status(200).json(zoos))
  .catch(err => res.status(500).json({message: 'There was an error retrieving the Zoos information'}))
})

router.get('/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .first()
  .then(zoo => {
    if (zoo) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({ message: 'A zoo with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error retrieving the information for that Zoo' }))
})

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'The request is missing required information: name of zoo' })
  } else {
      db('zoos')
      .insert(req.body)
      .into('zoos')
      .then(id => {
        res.status(201).json(id)
    })
    .catch(err => res.status(500).json({ message: 'The zoo record could not be created.'}))
  }

})

router.delete('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} records deleted` })
      } else {
        res.status(404).json({ message: 'A zoo with that ID could not be found' })
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an error accessing the router' }))
})

router.put('/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if (count) {
      res.status(200).json({ message: 'The zoo information has been updated' })
    } else {
      res.status(404).json({ message: 'A zoo with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})

 module.exports = router;
