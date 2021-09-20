const express = require("express")

const server = express()

server.use(express.json())

server.use('*', (req,res,next) =>{
    next({ status: 404, message: "not found!"})

    //res.json( {status: 404, message: "not found"})

    // res.status(404).json({
    //     message: "not found"
    // })
})

server.use( (err, req, res, next) => { //eslint-disable-line
    res.status( err.status || 500).json({ // ^ need next in this line, even if we don't use it or it won't work
        message: err.message
    })
})


module.exports = server
