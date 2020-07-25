const express = require('express');
const db = require('../data/db-config.js');
const server = express();
const carsRouter = require('../cars-router.js');

server.use(express.json());
server.use('/api/cars', carsRouter);

module.exports = server;