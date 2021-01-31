const express = require('express');
// const knex = require('knex');
const db = require('../../data/dbconfig.js');

// const fruitsModel = require('./fruits-model')


// router.get('/alternative', (req,res) =>{
//   db.find()
//     .then( fruits =>{
//       res.json(fruits)
//     })
//     .catch(er=>{
//       res.status(500).json({
//         message:'Failed 2 retirev fruits',er
//       })
//     })
// })

const router = express.Router();


router.get('/', (req, res) => {
  db('fruits')
    .then(fruits => {
      res.json(fruits);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve fruits' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('fruits').where({ id }).first()
    .then(fruit => {
      res.json(fruit);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve fruit' });
    });
});

router.post('/', (req, res) => {
  const fruitData = req.body;
  db('fruits').insert(fruitData)
    .then(ids => {
      db('fruits').where({ id: ids[0] })
        .then(newFruitEntry => {
          res.status(201).json(newFruitEntry);
        });
    })
    .catch(err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

module.exports = router;
