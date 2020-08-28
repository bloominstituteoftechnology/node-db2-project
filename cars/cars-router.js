const express = require("express")
const knex = require("knex")
const db = require("../data/dbConfig")

const router = express.Router()

//  read all accounts 
router.get("/test", async (req, res, next) => {
    console.log(cars)
    try {
        // select * from cars
        const cars = await db.select("*").from("cars")

        res.json(cars)
    } catch(err) {
        next(err)
    }
     
})

// Read By Id








// Create new Item 
