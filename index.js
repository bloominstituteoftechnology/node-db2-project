const express = require('express');
const helmet = require('helmet');
const welcomeRouter = require('./routers/welcomeRouter');
const carsRouter = require('./routers/carsRouter');

const server = express();
const port = process.env.PORT || 8080;

server.use(helmet());
server.use(express.json());
server.use(welcomeRouter);
server.use("/cars", carsRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        errorMessage: "A server error has occured"
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
