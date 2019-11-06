const express = require('express');

const Router = require('./data/router/router.js')

const server = express();

server.use(express.json());

server.use("/api/cars", Router);

server.get('/', (req, res) => {
    res.send('<h3>CAR-DEALER</h3>');
  });

module.exports = server;