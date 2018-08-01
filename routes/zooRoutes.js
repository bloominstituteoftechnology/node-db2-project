const router = require('express')();
const db = require('../database/db');

router.post('/', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(400).json(zoo);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;
  db('zoos')
    .where({ id })
    .update(zoo)
    .then(count => {
      if (count)
        res
          .status(200)
          .json({ succes: 'You have successfully updated that zoo' });
      else res.status(404).json({ failure: 'Zoo not found for updating' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(
      count =>
        count > 0
          ? res.status(200).json({ success: 'Record successfully deleted' })
          : res.status(404).json({ failure: 'Record not deleted' })
    )
    .catch(err => res.status(500).json(err));
});

router.get('/:id/bears', (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ zooId: id })
    .then(bears => {
      res.status(200).json(bears);
    });
});

module.exports = router;
