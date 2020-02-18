const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();
server.use(express.json());

server.get('/api/cars', (req, res) => {
  db.select('*').from('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retieving cars data.'
      })
    })
})

server.get('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('cars')
    .where({ id })
    .then(car => {
      [car] = car;
      res.status(200).json(car);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving car data.'
      });
    });
});

server.post('/api/cars', (req, res) => {
  const carData = req.body;
  db('cars')
    .insert(carData, 'id')
    .then(ids => {
      const [id] = ids;
      return db('cars')
              .select('id', 'vin', 'make', 'model')
              .where({ id })
              .first()
              .then(car => {
                res.status(201).json(car);
              });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error saving car data.'
      });
    });
});

module.exports = server;