const express = require('express')
const helmet = require('helmet');
const zooRoutes = require('./data/zooRoutes.js')
const bearRoutes = require('./data/bearRoutes.js')


// Initialize Server
const server = express();

//Middleware
server.use(express.json());
server.use(helmet());

// Zoo Enpoints
server.use('/api/zoos', zooRoutes)
server.use('/api/bears', bearRoutes)




  module.exports = server;