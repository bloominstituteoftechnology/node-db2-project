const express = require("express")
const helmet = require("helmet")
const carRouter = require('./cars-router/carsRouter.js')

const server = express()


server.use(helmet())
server.use(express.json())
server.use(carRouter)

server.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({
        message:"Something went wrong"
    })
})

server.listen(5000,() => {
    console.log("running at http://localhost:5000")
})