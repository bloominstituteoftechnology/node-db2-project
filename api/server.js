const express = require("express");

// routes
const CarsRoute = require("./cars/route.js");
const SalesRoute = require("./sales/route.js");

const server = express();

server.use(express.json());

// routes mw
server.use("/api/cars", CarsRoute);
server.use("/api", SalesRoute);

server.get("/", (req, res) => {
  res.status(200).send(`<h1>Server is up and running</h1>`);
});

module.exports = server;
