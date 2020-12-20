const express = require('express');
const carsRouter = require('./cars/cars-router');

const server = express();

server.use(express.json());
server.use('/api', carsRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Our server is not happy',
    });
});


module.exports = server;