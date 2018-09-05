const express = require("express");
const helmet = require("helmet");

const bearRoutes = require("../routes/bearRoutes.js");
const zooRoutes = require("../routes/zooRoutes.js");

module.exports = server => {
  // causes express middleware
  // stack to be added to every layer (request function)
  server.use(helmet());
  server.use(express.json());
  // must be used when using express Router
  // links url with requests
  server.use("/api/bears", bearRoutes);
  server.use("/api/zoos", zooRoutes);
};
