const express = require("express");
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars/cars-middleware.js');
const carsController = require("./cars/cars-router.js");
const server = express();

// DO YOUR MAGIC
// So we can parse JSON
server.use(express.json());

// Setup routes
server.get('/', function (req, res) {
    res.send('👋 Hello World')
});

/**
 * returns an array of cars sorted by id (or an empty array if there aren't any).
 */
server.get('/api/cars', carsController.getAll);

/**
 * returns a car by the given id.
 */
server.get('/api/cars/:id', checkCarId, carsController.getById);

/**
 * creates a car and returns its id
 */
server.post('/api/cars', [checkCarPayload, checkVinNumberValid, checkVinNumberUnique], carsController.create);

module.exports = server
