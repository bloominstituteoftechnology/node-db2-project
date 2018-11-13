const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('bears')
    .where({ id })
    .then(bear => res.status(200).json(bear))
    .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const bear = req.body
  db('bears')
    .insert(bear)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({ message: "error"}))
})

router.put('/:id', (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('bears')
    .where({ id })
    .update(changes)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db('bears')
    .where({ id })
    .del(id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err))
})

module.exports = router