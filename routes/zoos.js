const express = require('express');
const router = express.Router();

const check = require('../controllers/validations/validationsController');
const zoo = require('../controllers/zoos/zoosController');

router
  .route('/')
  .get(zoo.get)
  .post(check.zoo, zoo.create);

router
  .route('/:id')
  .get(check.id, zoo.getById)
  .post(check.id, check.zoo, zoo.edit)
  .delete(check.id, zoo.del);

module.exports = router;
