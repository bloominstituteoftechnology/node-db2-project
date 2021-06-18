const express = require("express")
const helmet = require("helmet");

const carRouter = require("./cars/cars-router.js");

const server = express()

// DO YOUR MAGIC
server.use(helmet());
server.use(express.json());

server.use("/api/cars", carRouter)

module.exports = server
