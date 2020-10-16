const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const cars = await db.select("*").from("cars")
    res.json(cars)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const car = await db
      .select("*")
      .from("cars")
      .where("id", req.params.id)
      .limit(1)

    res.json(car)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission: req.body.transmission,
      status: req.body.status
    }

    if ( !payload.vin || !payload.make || !payload.model || !payload.mileage ) {
      return res.status(400).json({
        message: "Missing Information => VIN, MAKE, MODEL, AND/OR MILEAGE"
      })
    }

    const [id] = await db.insert(payload).into("cars")
    const car = await db
      .first("*")
      .from("cars")
      .where("id", id)

    res.status(201).json(car)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission: req.body.transmission,
      status: req.body.status
    }

    if ( !payload.vin || !payload.make || !payload.model || !payload.mileage ) {
      return res.status(400).json({
        message: "Missing Information => VIN, MAKE, MODEL, AND/OR MILEAGE"
      })
    }

    await db("cars")
      .where("id", req.params.id)
      .update(payload)

    const car = await db
      .first("*")
      .from("cars")
      .where("id", req.params.id)

    res.json(car)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    await db("cars").where("id", req.params.id).del()

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router