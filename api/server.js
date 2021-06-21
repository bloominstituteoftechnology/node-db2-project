const express = require("express");
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars/cars-middleware.js');
const {
    getAll,
    getById,
    create
} = require('./cars/cars-model.js');
const server = express();

// DO YOUR 
// So we can parse JSON
server.use(express.json());

// Setup routes
server.get('/', function (req, res) {
    res.send('👋 Hello World')
});

/**
 * returns an array of cars sorted by id (or an empty array if there aren't any).
 */
server.get('/api/cars', async function(req, res) {
    const allCars = await getAll();

    res.send(allCars)
});

/**
 * returns a car by the given id.
 */
server.get('/api/cars/:id', checkCarId, function(req, res) {
    res.send(req.locals.car);
});

server.post('/api/cars', 
    [checkCarPayload, checkVinNumberValid, checkVinNumberUnique],
    async function(req, res) {
        const { vin, make, model, mileage, title, transmission } = req.body;
        const createCarResponse = await create({ vin, make, model, mileage, title, transmission });

        res.send(createCarResponse)
})

module.exports = server
