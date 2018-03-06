const express = require('express');
const router = express.Router();

const check = require('../controllers/validations/validationsController');
const bear = require('../controllers/bears/bearsController');

router
  .route('/')
  .get(bear.get)
  .post(check.bear, bear.create);

router
  .route('/:id')
  .get(check.id, bear.checkId, bear.getById)
  .put(check.id, check.bear, bear.checkId, bear.update)
  .delete(check.id, bear.checkId, bear.del);

module.exports = router;
