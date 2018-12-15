const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

router.use((req, res, next) => {
  next();
});

// INSERT INTO zoos (name) VALUES ('Hoogle Zoo');
router.post('/', (req, res) => {
  const zoo =req.body;

  if (zoo.name) {
    db('zoos')
    .insert(zoo)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ err: "Failed to insert zoo" });
    });
  } else {
    res.status(400).json({ message: "Please provide zoo name" });
  }
});

// SELECT * FROM zoos;
router.get('/', (req, res) => {
  db('zoos')
  .then(rows => {
    res.json(rows);
  })
  .catch(err => {
    // console.log(err);
    res.status(500).json({ err: "Failed to find zoos" });
  })
})

// SELECT * FROM zoos WHERE id = 1
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db('zoos').where('id', id)
  .then(row => {
    if (row.length > 0) {
      res.json(row);
    } else {
      res.status(404).json({ err: "The zoo with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to find zoo" });
  });
});

// UPDATE zoos SET name = 'something to update' WHERE id = 1
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;

  if (zoo.name) {
    db('zoos').where('id', id)
    .update(zoo)
    .then(rowCount => {
      if (rowCount) {
        res.json(rowCount);
      } else {
        res.status(404).json({ message: "The zoo with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to update zoo" });
    });
  } else {
    res.status(400).json({ message: "Please provide zoo name" });
  }
});

// DELETE FROM zoos WHERE id = 1;
router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db('zoos').where('id', id)
  .del()
  .then(rowCount => {
    if (rowCount) {
      res.status(201).json(rowCount);
    } else {
      res.status(404).json({ message: "The zoo with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to delete zoo" });
  });
});

module.exports = router;