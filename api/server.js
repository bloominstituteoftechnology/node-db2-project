const express = require('express');
const helmet = require('helmet');

const carsRouter = require('./cars/carsRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/cars', carsRouter);

server.get('/', (req, res) => {
    res.send(`Server is working!`);
});

server.use(errorHandler);

function errorHandler(error, req, res, next) {
    res.status(500).json({ message: 'Internal server error' });
}

module.exports = server;
