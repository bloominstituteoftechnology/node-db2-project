const router = require('express')();
const db = require('../database/db');

router.get('/', (req, res) => {
  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .then(bear => res.status(200).json(bear))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  if (!req.body.zooId) {
    res.status(400).json({ message: 'Please link bears to a zoo' });
  } else if (!req.body.species || !req.body.latinName) {
    res
      .status(400)
      .json({ message: 'Every bear should have a species and a name' });
  }
  const bear = req.body;
  db('bears')
    .insert(bear)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const bear = req.body;
  db('bears')
    .where({ id })
    .update(bear)
    .then(count => {
      if (count)
        res
          .status(200)
          .json({ succes: 'You have successfully updated that bear' });
      else res.status(404).json({ failure: 'bear not found for updating' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('bear')
    .where({ id })
    .del()
    .then(
      count =>
        count > 0
          ? res.status(200).json({ success: 'Bear successfully deleted' })
          : res.status(404).json({ failure: 'Bear not deleted' })
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
