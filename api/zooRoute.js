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
router.post('/:id', (req, res) => {
  const id = req.params.id
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
module.exports = router;