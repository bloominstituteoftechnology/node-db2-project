const express = require('express')
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const carsRouter = require('../car/car-router.js')


/* For Stretch later...
const salesRouter = require('../sales/sales-router.js)
server.use('/api/sales', salesRouter) */

server.use(helmet());
server.use(cors());
server.use(express.json())

//need express.json() before the routers get access to server!
server.use('/api/cars', carsRouter)
module.exports = server;