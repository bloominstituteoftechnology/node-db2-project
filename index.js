const express = require("express")
const helmet = require("helmet")
const welcomeRouter = require("./welcome/welcome-router")
const carsRouter = require("./cars/cars-router")


const server = express()
const port = process.env.PORT || 6000


server.use(helmet())
server.use(express.json())

server.use(welcomeRouter)
server.use("/data/cars/cars-router")

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
