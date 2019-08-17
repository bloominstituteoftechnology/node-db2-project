//use express
const express = require("express");
const server = express();
const CarsRouter = require('../routers/carsRouter');
server.use(express.json());
//use my middleware
server.use(logger);
//use my routes
server.use('/api/cars', CarsRouter)

//nice confirmation message that this is actually running
server.get("/", (req, res) => {
  res.send(`
    I bet you thought I wouldn't work.
  `);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `Method: ${req.method}, url: ${
      req.url
    }, timestamp: [${new Date().toISOString()}]`
  );
  next();
}

module.exports = server;