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

module.exports = router;
