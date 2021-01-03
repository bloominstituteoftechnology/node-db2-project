const express = require("express")
const db = require("../migrations/connect")

const Router = express.Router()

Router.get('/cars', async (req,res,next) => {
    try {
        res.json(await db("cars"))
    } catch(err) {
        next(err)
    }
})

Router.post("/cars", async(req,res,next) => {
    try {

        const [vin] = await db("cars").insert(req.body)
        const newCar = await db("cars").where({vin}).first()

        res.status(201).json(newCar)
    } catch(err) {
        next(err)
    }
})

module.exports = Router
