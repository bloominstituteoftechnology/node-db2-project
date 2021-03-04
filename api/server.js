// DO YOUR MAGIC
const express = require('express');
const carsRouter = require('./cars/cars-router');
const salesRouter = require('./sales/sales-router');

const server = express()

server.use(express.json())

server.use(carsRouter)
server.use(salesRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
