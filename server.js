const express = require("express");
const helmet = require("helmet");

const carsRouter = require("./cars/cars-router.js");
const logger = require("./middleware/logger.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use(logger);
server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Server is Working!</h1>");
});

module.exports = server;
