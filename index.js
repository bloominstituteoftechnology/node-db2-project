const express = require("express")
const carsRouter = require("./car-route/cars-router")
const server = express()

server.use(express.json())
server.use(carsRouter)
const port = 5000

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.use("/", (req,res)=>{
    res.json({
        message: "Welcome to My API"
    })
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
