const router = require('express').Router();

const Cars = require('./cars-model');

const middleware = require('./cars-middleware');


router.get('/', (req, res) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving cars list", error: err });
        });
});


router.get('/:id', middleware.checkCarId, (req, res) => {
    res.status(200).json(req.car);
});


router.post('/', middleware.checkCarPayload, middleware.checkVinNumberValid, middleware.checkVinNumberUnique, async (req, res) => {
    const car = await Cars.create(req.body);
    res.status(201).json(car);
});


module.exports = router;