const express = require('express');


const carsRouter = require('./car/cars-router');

const server = express();


server.use(express.json());

server.use('/api/cars', carsRouter);

module.exports = server;