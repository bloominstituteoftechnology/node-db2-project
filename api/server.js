const express = require("express");

const carsRouter = require("../cars/carsRouter.js"); 
// const db = require('../data/dbConfig')

const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter); // Use this address and this file at this address

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;