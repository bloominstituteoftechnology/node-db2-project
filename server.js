const express = require("express");

const carRouter = require('./carRouter')

const server = express()

server.use('/cars', carRouter)

server.get('/', (req, res) => {
    res.status(200).send(`<h1>WebDB II Challenge</h1>`)
})

module.exports = server; 