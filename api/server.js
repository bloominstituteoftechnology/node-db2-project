const express = require('express');
const helmet =  require('helmet');
const cors = require('cors');

const carsRouter = require('../cars/carsRouter');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('./api/cars', carsRouter);

server.get('/', (req, res) => {
    res.send('<h1>Cars data base</h1>')
})

module.exports = server
