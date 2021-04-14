const express = require("express")
const carsRoute = require("./cars/cars-router.js")

const server = express()
server.use(express.json())
server.use("/api/cars",carsRoute)

// DO YOUR MAGIC

module.exports = server
