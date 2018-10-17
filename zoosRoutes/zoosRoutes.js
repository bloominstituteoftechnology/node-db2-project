const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const router = express.Router()
const db = knex(knexConfig.development)

router.route('/')
  .get((req, res) => {
    db('zoos')
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({ error: 'Could not retrieve any zoos.' }))
  })
  .post((req, res) => {
    const zoo = req.body
    db.insert(zoo)
      .into('zoos')
      .then(zoo => res.status(201).json(zoo))
      .catch(err => res.status(500).json({ error: 'The zoo could not be added.' }))
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params
    db('zoos')
      .where({ id })
      .then(zoo => {
        if (!zoo || zoo < 1) return res.status(404).json({ error: 'The specified zoo could not be found.'})
        return res.status(200).json(zoo)
      })
      .catch(err => res.status(500).json({ error: 'Could not get the specified zoo' }))
  })
  .put((req, res) => {
    const { id } = req.params
    const changedZoo = req.body
    db('zoos')
      .where({ id })
      .update(changedZoo)
      .then(updatedZoo => {
        if (!updatedZoo || updatedZoo < 1) return res.status(404).json({ error: 'The specific zoo could not be found.' })
        return res.status(200).json(updatedZoo)
      })
      .catch(err => res.status(500).json({ error: 'The specified zoo could not be updated.' }))
  })
  .delete((req, res) => {
    const { id } = req.params
    db('zoos')
      .where({ id })
      .delete(id)
      .then(deletedZoo => {
        if (!deletedZoo || deletedZoo < 1) return res.status(404).json({ error: 'The specified zoo could not be found.' })
        return res.status(202).json(deletedZoo)
      })
      .catch(err => res.status(500).json({ error: 'The specified zoo could not be deleted.' }))
  })

module.exports = router