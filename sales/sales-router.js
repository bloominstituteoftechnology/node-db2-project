const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/sales", async (req, res, next) => {
	try {
		res.json(await db("sales"))
	} catch(err) {
		next(err)
	}
})

router.get("/sales/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const car = await db("sales").where({id})
		
		res.json(car)
	} catch(err) {
		next(err)
	}
})

router.get("/sales/v/:vin", async (req, res, next) => {
	try {
		const { vin } = req.params
		const car = await db("cars").where("vin", vin)
		
		res.json(car)
	} catch(err) {
		next(err)
	}
})


module.exports = router