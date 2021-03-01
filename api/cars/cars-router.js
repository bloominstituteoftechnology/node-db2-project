const router = require("express").Router()
const cars = require("./cars-model")
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")


// [GET] /api/cars returns an array of cars sorted by id (or an empty array if there aren't any).

router.get("/", async (req, res) => {
    try{
        const car = await cars.getAll()
        res.json(car)
    }
    catch(err) {
        res.status(400).json(err)
    }
})



// [GET] /api/cars/:id returns a car by the given id.
router.get("/:id", checkCarId(), async (req, res) => {
    try {
        const result = await cars.getById(req.params.id)
        res.json(result)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/', async ( req, res, next) => {
    try{
        const result = await cars.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

// [POST] /api/cars returns the created car. Leading or trailing whitespace on budget name should be trimmed before saving to db.

router.post('/', checkCarPayload(), checkVinNumberValid(), checkVinNumberUnique(), async ( req, res, next) => {
    try{
        const result = await cars.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
})
router.use((err, req, res ) => {
    res.status(500).json({
        message: 'something went wrong inside cars router',
        errMessage: err.message
    })
})
module.exports = router;