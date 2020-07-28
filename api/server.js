const express = require('express');
const CarsRouter = require('../cars/cars-router');

const db = require('../data/db-config');

const server = express();

server.use(express.json());
server.use('/api/cars', CarsRouter)
module.exports = server;