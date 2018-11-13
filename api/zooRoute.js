const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const router = express.Router();

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))

})

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

module.exports = router;