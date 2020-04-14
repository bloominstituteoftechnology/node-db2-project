const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexfile = require('../knexfile');
const db = knex(knexfile.development);

router.get('/', (req,res) => {
  db('cars')
    .then(cars => {
      res.status(200).json({ cars: cars })
    })
    .catch(err => res.status(500).json({ errormessage: `Internal Server error`, err }))
})

router.get('/:id', idValidator, (req,res) => {
  const id = req.params.id
  db('cars').where({ id })
    .first()
    .then(cars => {
      res.status(200).json(cars)
    })
    .catch(err => res.status(500).json({ errormessage: `Internal Server error`, err }))
})

router.post('/', carValidator, (req, res) => {
  db('cars').insert(req.body)
    .then(id => res.status(201).json({ message: `successfully added car to database` }))
    .catch(err => res.status(500).json({ errormessage: `Internal Server error`, err }))
})

router.delete('/:id', idValidator, (req, res) => {
  db('cars').where(req.params.id).del()
    .then(() => res.status(204).json({ message: `entry deleted successfully` }))
    .catch(err => res.status(500).json({ errormessage: `Internal Server error`, err }))
})

router.put('/:id', idValidator, (req, res) => {
  const id = req.params.id
  db('cars').where({ id }).update(req.body)
    .then(num => {
      if(num) {
        db('cars').where({ id })
          .first()
          .then(car => res.status(201).json(car))
      }
    })
    .catch(err => res.status(500).json({ errormessage: `Internal Server error`, err }))
});

module.exports = router;

function idValidator(req, res, next) {
  const id  = req.params.id
  db('cars').where({ id })
    .then(item => {
      if(item.length) {
        next()
      } else {
        res.status(404).json({ errorMessage: `id doesn't exist` })
      }
    })
    .catch(err => res.status(500).json({ errormessage: `Internal Server error`, err }))
}

function carValidator(req, res, next) {
  const item = req.body
  if(item.make && item.model && item.year) {
    next()
  } else {
    res.status(404).json({ errorMessage: `must contain a make, model and year` })
  }
}