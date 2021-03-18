const express = require("express")
const carRouter = require('./cars/cars-router')
const server = express()

server.use(express.json())
server.use('/api/car', carRouter)
// DO YOUR MAGIC

server.get('/', (req, res) => {
    res.json({ message: 'server connected'})
})

module.exports = server
