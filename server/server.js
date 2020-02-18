const express = require('express');
const CarsRouter = require('./routers/carsRouter');

const server = express();
server.use(express.json());

server.use('/cars', CarsRouter);

module.exports = server;