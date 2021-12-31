const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const carsRouter = require("./cars/cars-router")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

server.use("/api/cars", carsRouter)




module.exports = server
