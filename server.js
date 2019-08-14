const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js')

const db = knex(knexConfig.development)

const server = express();

server.get('/', async (req, res) => {
  try {
    const cars = await db('cars');
    res.json(cars); 
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  }
});

server.post('/', async (req, res) => {
  try {
    const carData = req.body;
    const [ id ] = await db('cars').insert(carData);
    const newCarEntry = await db('cars').where({ id });
  
    res.status(201).json(newCarEntry);
  } catch (err) {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  }
});

module.exports = server;
