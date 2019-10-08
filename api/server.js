const express = require('express');
const helmet = require('helmet');

// carsRouter goes here
const carsRouter = require('../cars/cars-router');

const server = express();

server.use(helmet());
server.use(express.json());

// connect router to '/api/cars' here
server.use('/api/cars', carsRouter);

module.exports = server;