const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bearRouter = require('./bears');
const zooRouter = require('./zoos');

module.exports = server => {
  server.use(express.json());
  server.use(morgan('dev'));
  server.use(helmet());
  server.use('/api/bears', bearRouter);
  server.use('/api/zoos', zooRouter)
}