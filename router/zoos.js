const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))
})
  
router.get('/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id })
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err))
})
  
router.post('/', (req, res) => {
  const zoo = req.body
  db('zoos')
    .insert(zoo)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({ message: "error"}))
})
  
router.put('/:id', (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('zoos')
    .where({ id })
    .update(changes)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id })
    .del(id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err))
})

module.exports = router