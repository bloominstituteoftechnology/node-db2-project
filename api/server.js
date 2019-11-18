const express = require('express')

const helmet = require('helmet')

const carsrouter = require('../cars/carsrouter')

const server = express()

server.use(helmet())
server.use(express.json())
server.use('/api/cars', carsrouter)

module.exports = server;








