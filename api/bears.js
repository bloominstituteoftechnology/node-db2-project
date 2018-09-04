const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.post('/', (req, res) => {
  const { name, zooId } = req.body;
  if (!name || !zooId) {
    res.status(404).json({ error: 'Bears require a zooId and a name.' });
  } else {
    db('bears')
      .insert(req.body)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
  }
});

router.get('/', (req, res) => {
  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .then(bear => {
      if (bear) res.status(200).json(bear);
      else res.status(404).json({ error: 'The bear with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .del()
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The bear with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: 'The bear with the specified ID wasn\'t found.' });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
