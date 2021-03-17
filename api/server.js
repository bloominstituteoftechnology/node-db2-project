const express = require("express")

const server = express()

// DO YOUR MAGIC

const CarsRouter = require('./cars/cars-router')

server.use(express.json())
server.use("/api/cars",CarsRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
  })

module.exports = server
