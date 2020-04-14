const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexfile = require('../knexfile');
const db = knex(knexfile.development);

router.get('/', (req,res) => {
  db('cars')
    .then(cars => {
      res.status(200).json({ data: cars })
    })
    .catch(err => res.status(500).json({ errormessage: `Internal Server error` }))
})

module.exports = router;