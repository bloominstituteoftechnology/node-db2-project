const express = require("express")

const server = express()

// DO YOUR MAGIC

const carRouter = require('./cars/cars-router')


server.use(express.json())
server.use(carRouter)

module.exports = server
