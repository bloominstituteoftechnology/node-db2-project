// DO YOUR MAGIC
const express = require('express');
const carsRouter = require('./cars/cars-router');

const server = express()

server.use(express.json())

server.use(carsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
