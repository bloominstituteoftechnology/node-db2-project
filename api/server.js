const express = require('express');

const carRouter = require('./cars/cars-router.js'); //need to create car router file

const server = express();

server.use(express.json());

server.use('/api/cars', carRouter)

module.exports = server