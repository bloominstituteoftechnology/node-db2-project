const express = require('express');
const helmet = require('helmet');

const carsRouter = require('../cars/carRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/cars', carRouter);

module.exports = server; 