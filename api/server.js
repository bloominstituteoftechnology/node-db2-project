const express = require('express');

const CarRouter = require('../cars/cars-router');

const server = express();

server.use(express.json());

server.use('/api/cars', CarRouter);

module.exports = server;