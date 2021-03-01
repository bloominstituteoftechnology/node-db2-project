const router = require("express").Router()
const {getAll, getById, create} = require("./cars-model")
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require("./cars-middleware")


router.get("/api/cars", async (req, res) => {
    try {
        const cars = await getAll()
        res.status(200).json(cars)
    } catch(err) {
        res.status(400).json({err})
    }
})

router.get("/api/cars/:id", checkCarId(), (req, res) => {
    res.status(200).json(res.carInfo)
})

router.post("/api/cars", checkCarPayload(), checkVinNumberValid(), checkVinNumberUnique(), async (req, res) => {
    const newCar = await getById(req.carsList.length + 1)
    res.status(202).json({newCar})
})