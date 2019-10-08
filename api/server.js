const express = require('express');
const helmet = require('helmet');

// carsRouter goes here

const server = express();

server.use(helmet());
server.use(express.json());

// connect router to '/api/cars' here

module.exports = server;