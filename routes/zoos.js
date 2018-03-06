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
  .put(check.id, check.zoo, zoo.update)
  .delete(check.id, zoo.checkId, zoo.del);

module.exports = router;

/*
model solution

*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
const db = require();

zooRouter.get('/', (req, res) => {
  db
    .getAll()
    .then(zoos => res.json(zoos))
    .catch(err => res.status(500).json(err))
})

zooRouter.get('/:id', (req, res) => {
  db
    .getById(id)
    .then()
    .catch()
})


*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
const knex = require();

const db = {
  getAll: function() {
    return knex('zoos');
  },
  getById: function(id) {
    return knex('zoos').where({ id });
  }
}

module.exports = db;

*/
