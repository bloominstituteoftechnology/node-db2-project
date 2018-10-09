const express = require('express');
const router = express.Router();

const zoos = require('./zoosModel.js');

router.get('/', (req, res) => {
  zoos
    .find()
    .then((zoos) => {
      res.status(200).json(zoos);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  zoos
    .findById(id)
    .then((zoo) => {
      if (!zoo) {
        return res.status(404).send({
          message: `The zoo with the specified ID ${id} does not exist.`,
        });
      }
      res.status(200).json(zoo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const zoo = { name };
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the zoo.',
    });
  }
  zoos
    .add(zoo)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newZoo = { name };
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the zoo.',
    });
  }
  zoos.update(id, newZoo).then((count) => {
    if (!count) {
      res.status(404).json({
        message: 'No zoo found to update',
      });
    }
    res.status(200).json({ message: `${count} record updated` });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  zoos
    .remove(id)
    .then((remove) => {
      if (!remove) {
        return res.status(404).send({
          message: `The zoo with the specified ID ${id} does not exist.`,
        });
      }
      res.status(200).send({ message: `zoo with ID ${id} was removed.` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
