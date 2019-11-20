const express = require('express');

const carsRouter = require('../cars/cars-router.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send("<h1>Default Route</h1>")
})

server.use('/api/cars', carsRouter);

module.exports = server;