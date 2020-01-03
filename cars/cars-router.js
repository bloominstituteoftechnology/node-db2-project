const express = require("express")
const db = require('../utils/db')

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const cars = await db("cars").select()
    
        return res.json(cars)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
      const car = await db("cars").where({ id: req.params.id }).first()
    
     return res.json(car)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
      const ids = await db("cars").insert(req.body)
      const newCar = await db("cars").where({ id: ids[0] }).first()
    
    return res.status(201).json(newCar)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
    try {
        await db("cars").where("id", req.params.id).update(req.body)
        return res.json(await db("cars").where("id", req.params.id).first())
    }
    catch (err) {
        next (err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await db("cars").where("id", req.params.id).del()
        return res.status(204).json(req.params.id)
    }
    catch (err) {
        next (err)
    }
})

module.exports = router