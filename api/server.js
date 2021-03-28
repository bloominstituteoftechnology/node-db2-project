const express = require("express")

const server = express()

// DO YOUR MAGIC
const carsRouter = require('./cars/cars-router');

server.use(express.json());
server.use(carsRouter);

module.exports = server;
