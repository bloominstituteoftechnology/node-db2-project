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
  .get(check.id, zoo.checkId, zoo.getById)
  .put(check.id, check.zoo, zoo.checkId, zoo.update)
  .delete(check.id, zoo.checkId, zoo.del);

module.exports = router;
