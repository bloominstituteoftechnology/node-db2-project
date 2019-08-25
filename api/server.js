const express = require('express');
const vehicleRouter = require('../routers/vehicleRouter.js');
const server = express();

server.use(express.json())
server.use('/api/vehicles', vehicleRouter)

module.exports = server;