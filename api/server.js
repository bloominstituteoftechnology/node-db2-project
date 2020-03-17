const express = require('express');
const helmet = require('helmet');

const fruitsRouter = require('../cars/carsRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', fruitsRouter);

module.exports = server;
