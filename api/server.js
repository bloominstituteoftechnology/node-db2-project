const express = require("express")

const CarsRouter = require('./cars/cars-router');

const server = express()

// DO YOUR MAGIC

server.use(express.json());

server.use("/api/cars", CarsRouter);


module.exports = server
