const express = require('express')
const helmet = require('helmet');
const zooRoutes = require('./data/zooRoutes.js')


// Initialize Server
const server = express();

//Middleware
server.use(express.json());
server.use(helmet());

// Zoo Enpoints
server.use('/api/zoos', zooRoutes)




  module.exports = server;