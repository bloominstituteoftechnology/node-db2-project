const express = require("express")

const db = require("./config")

const router = express.Router()

router.get("/car", async (req,res, next) => {
    try {
        res.json(await db("car"))
    } catch(err) {
        next(err)
    }
})

router.post("/car", async (req,res,next) => {
    try {
        const [VIN] = await db("car").insert(req.body)
        const newCar = await db("car").where({VIN}).first()

        res.status(201).json(newCar)
    } catch(err) {
        next(err)
    }
})


module.exports = router