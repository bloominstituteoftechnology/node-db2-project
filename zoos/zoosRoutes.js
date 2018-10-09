const express = require('express');

const db = require('./zoosModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ error: `No zoo by that ID.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const zoo = req.body;
  db.add(zoo)
    .then(ids => {
      if (ids > 0) {
        res.status(201).json(ids);
      } else {
        res.status(404).json({ error: 'name is required.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;

  db.update(id, zoo)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: `No zoo with that ID.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) {
        res.status(201).json(count);
      } else {
        res.status(404).json({ error: `No zoo with supplied ID.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
