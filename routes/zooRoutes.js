const express = require('express');
const router = express.Router();
const db = require('../dbConfig.js');

router.get('/', (req, res, next) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(row => {
      if (row.length < 1) {
        return next({ code: 404 });
      }
      res.status(200).json(row);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const zoo = req.body;
  if (!zoo.name) {
    return next({ code: 400 });
  }
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const zoo = req.body;
  if (!zoo.name) {
    return next({ code: 400 });
  }
  db('zoos')
    .where({ id: req.params.id })
    .update(zoo)
    .then(response => {
      if (!response) {
        return next({ code: 404 });
      }
      res.status(200).json({ id: req.params.id, name: zoo.name });
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(data => {
      if (!data) {
        return next({ code: 404 });
      }
      res.status(200).json({ id: req.params.id });
    })
    .catch(err => next(err));
});

module.exports = router;
