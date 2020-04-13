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
      .then((car) => {
          if(car){ res.status(200).json({message: "car deleted succesfully"})
          } else {
              res.status(404).json({message: "car not found", })
          }
      })
      .catch((err) =>
          res.status(500).json({ message: "faild to delete car ", err })
      );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cars')
      .where({id})
      .update(changes)
      .then((car) => {
          if(car){ res.status(200).json(changes)
          } else {
              res.status(404).json({message: "car not found", })
          }
      })
      .catch((err) =>
          res.status(500).json({ message: "faild to update car ", err })
      );
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars').insert(carData)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newCarEntry => {
      res.status(201).json(newCarEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to post data" });
  });
});

// router.get('/:id/sale', (req, res) => {
//   const { id } = req.params;

//   db('sales').where({ 'car_id': id})
//   .then((sales) => sales.map((action) => mappers.actionToBody({...action})))
//   .then((sale) => {
//     res.status(200).json({ success: true, sale });
//   })
//   .catch (err => {
//     res.status(500).json({ message: 'Failed to retrieve car' });
//   });
// });
  module.exports = router;
