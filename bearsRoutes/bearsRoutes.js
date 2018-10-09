const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const router = express.Router()
const db = knex(knexConfig.development)

router.route('/')
  .get((req, res) => {
    db('bears')
      .then(bears => res.status(200).json(bears))
      .catch(err => res.status(500).json({ error: 'Could not retrieve any bears.' }))
  })
  .post((req, res) => {
    const bear = req.body
    db.insert(bear)
      .into('bears')
      .then(bear => res.status(201).json(bear))
      .catch(err => res.status(500).json({ error: 'The bear could not be added.' }))
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params
    db('bears')
      .where({ id })
      .then(bear => {
        if (!bear || bear < 1) return res.status(404).json({ error: 'The specified bear could not be found.'})
        return res.status(200).json(bear)
      })
      .catch(err => res.status(500).json({ error: 'Could not get the specified bear' }))
  })
  .put((req, res) => {
    const { id } = req.params
    const changedBear = req.body
    db('bears')
      .where({ id })
      .update(changedBear)
      .then(changedBear => {
        if (!changedBear || changedBear < 1) return res.status(404).json({ error: 'The specific bear could not be found.' })
        return res.status(200).json(changedBear)
      })
      .catch(err => res.status(500).json({ error: 'The specified bear could not be updated.' }))
  })
  .delete((req, res) => {
    const { id } = req.params
    db('bears')
      .where({ id })
      .delete(id)
      .then(deletedBear => {
        if (!deletedBear || deletedBear < 1) return res.status(404).json({ error: 'The specified bear could not be found.' })
        return res.status(202).json(deletedBear)
      })
      .catch(err => res.status(500).json({ error: 'The specified bear could not be deleted.' }))
  })

module.exports = router