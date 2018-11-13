const express = require('express');

const zoosRoutes = require('./Zoos/zoosRoutes.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'api' });
})

router.use('/zoos', zoosRoutes)

module.exports = router;
