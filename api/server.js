const express = require("express")

const server = express()

const carsRouter = require("./cars/cars-router")

server.use(express.json());
server.use("/api/cars", carsRouter)

server.get("/", (req,res) => {
    res.send("<h1>Unit 4: Node DB2 Project")
})

module.exports = server
