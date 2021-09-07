const express = require("express")

const carsRouter = require('./cars/cars-router')

const server = express()

// DO YOUR MAGIC
server.use(express.json())

server.use('/api/cars', carsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server
