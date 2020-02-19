const express = require("express");

const carRouter = require("../router/car-router.js");

const server = express();

server.use(express.json());

server.use("/api/cars", carRouter);

module.exports = server;
