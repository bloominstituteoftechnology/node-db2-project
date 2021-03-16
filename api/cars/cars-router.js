// DO YOUR MAGIC
const router = require('express').Router();
const { getAll, getById, create } = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

// GET All Cars
router.get('/', (req, res, next) => {
    getAll()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            next(err);
        });
});

// GET Car By ID
router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car);
})


// POST New Car
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    create(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(err => {
            next(err);
        });
});


// Catch-all Error Handler

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: 'Something went wrong inside car router.',
        errMessage: err.message,
    });
});

module.exports = router;