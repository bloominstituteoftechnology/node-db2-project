const express = require("express");
const carRouter = require("./cars");

const apiRouter = express.Router();

apiRouter.use("/cars", carRouter);

module.exports = apiRouter;
