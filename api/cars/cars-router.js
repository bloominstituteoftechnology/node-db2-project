// DO YOUR MAGIC
const express = require("express");
const router = require('express').Router();

const Cars = require('./cars-model');
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,

} = require('./cars-middleware');



router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(next);
});


router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car)
    .catch(next)
})


router.put('/:id', checkCarId, checkCarPayload, checkVinNumberValid, checkVinUniqueOrMatch, (req, res, next) => {
  Cars.update(req.params.id, req.body)
    .then(updated => {
      res.json(updated);
    })
    .catch(next);
});

router.delete('/:id', checkCarId, (req, res, next) => {
  const deletedCar = req.car;
  Cars.remove(req.params.id)
    .then(deletedNum => {
      res.json(deletedCar);
    })
    .catch(next);
});

module.exports = router;

