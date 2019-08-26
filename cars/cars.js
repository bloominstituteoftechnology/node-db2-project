const express = require('express');
const knex = require('knex');
const db= require('../data/dbConfig')

server.get('/', (req, res) => {
    db('cars')
    .then(cars => {
      res.json(cars); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
  })

server.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cars').where({ id }).first()
    .then(cars => {
      res.json(cars);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve car' });
    });
  });

  server.post('/', (req, res) => {
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
      res.status(500).json({ message: "Failed to store data" });
    });
  });

