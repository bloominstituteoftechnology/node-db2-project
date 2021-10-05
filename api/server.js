const express = require("express")
const server = express()
const carsRouter = require('./cars/cars-router')

server.use(express.json());
server.use('./api/cars', carsRouter);

server.get('/', (req, res) => {
    res.json({ message: 'Cars Api is working add a route to see more' });
    console.log('api is working');
})

server.use("*", (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.statsu || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server
