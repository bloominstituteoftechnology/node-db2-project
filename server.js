const express = require('express');
const helmet = require('helmet');

const zooRoute = require('./routes/zooRoute');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoo', zooRoute);

module.exports = server;
