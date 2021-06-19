const express = require("express");
const helmet = require("helmet");

const carsRouter = require("./cars/cars-router");

const server = express();

// DO YOUR MAGIC
server.use(helmet());
server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running player!" });
});

module.exports = server;
