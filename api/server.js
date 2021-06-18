const express = require("express")
// const helmet = require('helmet')

const carRouter = require("./cars/cars-router.js")

const server = express()

// DO YOUR MAGIC
// server.use(helmet());
server.use(express.json());

server.use("/api/cars", carRouter)

server.get("*", (req, res) =>{
    res.send(`<h2>"Server running"</h2>`)
})

module.exports = server
