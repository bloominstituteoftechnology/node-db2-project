const express = require("express")

const server = express()

// DO YOUR MAGIC
const router = require('./cars/cars-router')


server.use(express.json())
server.use('/api/cars', router)

module.exports = server
