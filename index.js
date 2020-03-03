const express = require('express');
const carRouter = require('./car-router');
const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use('/api/cars', carRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});