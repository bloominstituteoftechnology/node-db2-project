const { json } = require('express');
const express = require('express')
const server = express();
const db = require('./dbConfig')
server.use(json())

server.get("/", async (req, res) => {
    try{
        const cars = await db.select("*").from("cars")
        res.json(cars)
    }catch(error) {
        console.log(error)
    }
})

server.post("/", async (req, res) => {
    try{
        const cars = await db
        .insert({
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmissiontype: req.body.transmissiontype,
            title: req.body.title

        })
        .into("cars")
        res.status(201).json(cars)
    }catch(error) {
        console.log(error)
    }
})



const port = 5000;
server.listen(port , () => {
    console.log(`Server is running on http://localhost:${port} `)
})