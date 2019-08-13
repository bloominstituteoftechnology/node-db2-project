const express = require('express');

const carsRouter = require('../cars/carsRouter');

const server = express();

const logger = (req, res, next) => {
    console.log(`${req.method} request was sent to ${req.url}`);
    next();
}

server.use(express.json());
server.use(logger);

server.use('/api/cars', carsRouter);

module.exports = server;
