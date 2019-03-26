const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  },
  // debug: true,                          // TODO: remove this before deploying
}

const db = knex(knexConfig);

console.log('zoos router running');

router.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

router.get('/api/zoos/:id', (req, res) => {
  const zooid = req.params.id;
  db('zoos')
  .where({ id: zooid })
  .first()
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

router.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db('zoos')
        .where({ id })
        .first()
        .then(zoo => {
          res.status(201).json(zoo);
        })
    })
    .catch(error => {
      res.status(500).json({ message: "ERrOr, CaN'T CoMpUtE"})
    })
})

router.put("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db('zoos')
        .where({ id: req.params.id })
        .first()
        .then(zoos => {
          res.status(200).json(zoos);
        })
        // res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Zoo not found. Can not update" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if( count > 0){
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Zoo was not found' });
    }
  })
  .catch(error => {
    res.status(500).json({ message: "Internal server error"})
  })
})

module.exports = router;