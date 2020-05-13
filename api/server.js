const express = require("express");

const db = require("");

const morgan = require("morgan");
const server = express();

server.use(morgan("short"),helmet(),express.json())

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})