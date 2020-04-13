const express = require('express');
const db =require('../data/db-config');

const router = express.Router();
// add end points here
router.get('/', (req, res) => {
    db('sales')
    .then(car => {
      res.json(car); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
  });

  module.exports = router;