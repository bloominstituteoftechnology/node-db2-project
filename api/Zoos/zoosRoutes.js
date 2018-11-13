// zoosRoutes.js
const express = require('express')
const knex = require('knex')

const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'zoooz' });
})

module.exports = router;