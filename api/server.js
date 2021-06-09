const express = require("express")

const carsRouter = require('./cars/cars-router')

const server = express()

// DO YOUR MAGIC
server.use('/api/cars', carsRouter)
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'page not found'
    })
})
module.exports = server
