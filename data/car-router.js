const express = require("express")

const db = require("./config")

const router = express.Router()

router.get("/cars", async (req,res, next) => {
    try {
        res.json(await db("cars"))
    } catch(err) {
        next(err)
    }
})


module.exports = router