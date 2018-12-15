const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

router.use((req, res, next) => {
  next();
});

// INSERT INTO bears (name) VALUES ('Polar Bear');
router.post('/', (req, res) => {
  const bear =req.body;

  if (bear.name) {
    db('bears')
    .insert(bear)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ err: "Failed to insert bear" });
    });
  } else {
    res.status(400).json({ message: "Please provide bear name" });
  }
});

// SELECT * FROM bears;
router.get('/', (req, res) => {
  db('bears')
  .then(rows => {
    res.json(rows);
  })
  .catch(err => {
    // console.log(err);
    res.status(500).json({ err: "Failed to find bears" });
  })
})

// SELECT * FROM bears WHERE id = 1
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db('bears').where('id', id)
  .then(row => {
    if (row.length > 0) {
      res.json(row);
    } else {
      res.status(404).json({ err: "The bear with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to find bear" });
  });
});

// UPDATE bears SET name = 'something to update' WHERE id = 1
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const bear = req.body;

  if (bear.name) {
    db('bears').where('id', id)
    .update(bear)
    .then(rowCount => {
      if (rowCount) {
        res.json(rowCount);
      } else {
        res.status(404).json({ message: "The bear with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to update bear" });
    });
  } else {
    res.status(400).json({ message: "Please provide bear name" });
  }
});

// DELETE FROM bears WHERE id = 1;
router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db('bears').where('id', id)
  .del()
  .then(rowCount => {
    if (rowCount) {
      res.status(201).json(rowCount);
    } else {
      res.status(404).json({ message: "The bear with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to delete bear" });
  });
});

module.exports = router;

