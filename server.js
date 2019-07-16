const express = require('express');
const db = require('./data/dbConfig');

const server = express();
server.use(express.json());

function getAllCars() {
	return db('cars');
}

function getCarById(id) {
	return db('cars').where({ id });
}

function addNewCar({ vin, make, model, mileage, status, type }) {
	return db('cars').insert({ vin, make, model, mileage, status, type });
}

function updateCarById(id, { vin, make, model, mileage, status, type }) {
	return db('cars')
		.where({ id })
		.update({ vin, make, model, mileage, status, type });
}

function deleteCarById(id) {
	return db('cars')
		.where({ id })
		.del();
}

server.use(express.json());

server.get('/api/cars', async (req, res) => {
	try {
		const cars = await getAllCars();
		res.status(200).json(cars);
	} catch (error) {
		res.status(500).json({
			message: 'Unable to retrieve cars.'
		});
	}
});

server.get('/api/cars/:id', validateCarId, async (req, res) => {
	try {
		const car = await getCarById(req.params.id);
		res.status(200).json(car);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve car ${req.params.id}.`
		});
	}
});

server.post('/api/cars', validateCar, async (req, res) => {
	console.log(req.body);
	const { vin, make, model, mileage, status, type } = req.body;
	try {
		const newCarId = await addNewCar({
			vin,
			make,
			model,
			mileage,
			status,
			type
		});
		console.log(newCarId);
		const newCar = await getCarById(newCarId[0]);
		res.status(201).json(newCar);
	} catch (error) {
		res.status(500).json({
			message: 'Unable to add car to the database.'
		});
	}
});

server.put('/api/cars/:id', validateCarId, validateCar, async (req, res) => {
	const id = req.params.id;
	try {
		const updateCar = await updateCarById(id, req.body);
		const updatedCar = await getCarById(id);
		res.status(200).json(updatedCar);
	} catch (error) {
		res.json(500).json({
			message: `Unable to update car ${id}`
		});
	}
});

server.delete('/api/cars/:id', validateCarId, async (req, res) => {
	const id = req.params.id;
	try {
		const deleteCar = await deleteCarById(id);
		res.status(200).json({
			message: `Car ${id} has been deleted successfully!`
		});
	} catch (error) {
		res.status(500).json({
			message: `Unable to delete car ${id}.`
		});
	}
});

// Middleware
function validateCar(req, res, next) {
	if (Object.keys(req.body) == 0) {
		res.status(400).json({ message: 'Missing car data' });
	} else if (
		!req.body.vin ||
		!req.body.make ||
		!req.body.model ||
		!req.body.mileage
	) {
		res.status(400).json({
			message: 'The following fields are required: VIN, Make, Model, Mileage.'
		});
	} else {
		next();
	}
}

async function validateCarId(req, res, next) {
	const id = req.params.id;

	const car = await getCarById(id);

	if (!car) {
		res.status(404).json({
			message: `Car with id of ${id} doesn't exist. Please check the ID and try again.`
		});
	} else {
		next();
	}
}

module.exports = server;
