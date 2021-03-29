const express = require("express");
const helmet = require('helmet');

const carRouter = require('./cars/cars-router.js');

const server = express()

// DO YOUR MAGIC

server.use(helmet());
server.use(express.json());
server.use('/api/cars', carRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: "Here where everything starts"})
})

module.exports = server;
