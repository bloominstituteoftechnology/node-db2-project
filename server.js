const express = require('express');

const CarRouter = require('./CarRouter.js');

const server = express();

server.use(express.json());

server.use('/api/cars', CarRouter);

module.exports = server;
