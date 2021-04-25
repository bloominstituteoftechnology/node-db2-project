// DO YOUR MAGIC
const router = require('express').Router()
const db = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require("./cars-middleware")


router.get("/api/cars", async (req, res) => {
  const getAll = await db.getAll()
    res.status(200).json(getAll)
})


router.get("/api/cars/:id", checkCarId, async (req,res) => {
  const getCar = await db.getById(req.params.id)
    res.status(200).json(getCar) 
})


router.post("/api/cars", checkCarPayload, checkVinNumberValid, checkVinNumberUnique,  async (req, res) => {
  const newCar = await db.create(req.body)
    if (newCar) {
      res.status(200).json(newCar)
    } else {
      res.status(500).json({message: "something went wrong.."})
    }
})



module.exports = router