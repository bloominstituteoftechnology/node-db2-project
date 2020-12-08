const express = require('express');

const carsRouter = require('./cars/cars-router.js');

const server = express();

server.use(express.json());

server.use('/api/cars', carsRouter);

server.get('/', async(req, res) => {
    await res.json({message: 'This is the way'});
});

module.exports = server;