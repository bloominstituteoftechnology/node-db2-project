const express = require("express")
const server = express()
// const carsRouter = require('./cars/cars-router');

server.use(express.json());

// server.use('/api/cars', carsRouter);

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'wrong'
  })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = server
