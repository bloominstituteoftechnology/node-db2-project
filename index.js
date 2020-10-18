const express = require("express")

const carRouter = require("./data/car-router")
const server = express()
const port = process.env.Port || 5000

server.use(express.json())

server.use(carRouter)

server.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went Wrong"
    })
})

server.listen(port, () => {
    console.log(`server running on ${port}`)
})