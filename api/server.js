const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('../zoos/zoos-router.js');
const bearsRouter = require('../bears/bears-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);

module.exports = server;