const express = require('express');
const db =require('../data/db-config');

const router = express.Router();
// add end points here
router.get('/', (req, res) => {
    db('cars')
    .then(car => {
      res.json(car); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cars').where({ id }).first()
    .then(car => {
      res.json(car);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve car' });
    });
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
        .where({id})
        .del()
        .then((record) => {
            if(record){ res.status(200).json({message: "record deleted succesfully"})
            } else {
                res.status(404).json({message: "record not found", })
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "faild to delete record ", err })
        );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cars')
      .where({id})
      .update(changes)
      .then((record) => {
          if(record){ res.status(200).json(changes)
          } else {
              res.status(404).json({message: "record not found", })
          }
      })
      .catch((err) =>
          res.status(500).json({ message: "faild to update record ", err })
      );
});

router.post('/', (req, res) => {
  const fruitData = req.body;
  db('cars').insert(fruitData)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newFruitEntry => {
      res.status(201).json(newFruitEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});
  module.exports = router;
