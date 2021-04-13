
const express = require('express');
const Cars = require('./cars-model');
// const {  } = require('./cars-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(cars => res.status(200).json(cars))
    .catch(err => next(err));
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
