const express = require("express");
const helmet = require("helmet");

const bearRoutes = require("../routes/bearRoutes.js");
const zooRoutes = require("../routes/zooRoutes.js");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());

  server.use("/api/bears", bearRoutes);
  server.use("/api/zoos", zooRoutes);
};
