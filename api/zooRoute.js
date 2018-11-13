const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const router = express.Router();


/* ---- GET ALL ZOOS----  */
router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))

})

/* ---- GET ZOO BY ID ----  */
router.get('/:id', (req, res) => {
  const { id } = req.params

  db('zoos')
    .where({ id: id })
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))

})

/* ---- ADD NEW ZOO ----  */
router.post('/', (req, res) => {
  const zoo = req.body
  db('zoos')
    .insert(zoo)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting',
        err
      })
    })
})

/* ---- EDIT ZOO ----  */
router.put('/:id', (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('zoos')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting', err
      })
    })
})

/* ---- DELETE ZOO ----  */
router.delete('/:id', (req, res) => {
  const { id } = req.params

  db('zoos')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error deleting', err
      })
    })
})


module.exports = router;