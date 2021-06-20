const express = require("express")

const CarRouter = require("./cars/cars-router.js")

const server = express()

server.use(express.json())

server.use('/api/cars',CarRouter)

server.get("/",(req,res)=>{
    res.status(200).json({api: "up"})
})

module.exports = server
