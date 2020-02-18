const express = require('express');

const carsRouter = require('../cars/cars-router.js');

const server = express();

server.use(express.json());

server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
    res.send('<h2>Welcome to the API</h2>')
})

module.exports = server;