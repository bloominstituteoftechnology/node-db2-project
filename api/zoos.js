const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.post('/', (req, res) => {
  db('zoos').insert(req.body)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .update(req.body)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
