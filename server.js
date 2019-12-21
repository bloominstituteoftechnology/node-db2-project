const express = require("express")
const helmet = require("helmet")
const carsRouter = require("./cars/cars-router")

const server = express()
const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 4000

server.use(helmet())
server.use(express.json())

server.use("/api/cars", carsRouter)
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something is wrong",
    })
})

server.listen(PORT, HOST, () => {
    console.log(`Listening on port ${PORT}...`);
});
