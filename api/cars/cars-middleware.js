const Cars = require('./cars-model');
const db = require('../../data/db-config');
const vinvalidator = require('vin-validator');
const { json } = require('express');

const checkCarId = async (req, res, next) => {
	try {
		const car = await Cars.getById(req.params.id);
		if (car) {
			req.car = car;
			next();
		} else {
			res
				.status(404)
				.json({ message: `car with id ${req.params.id}is not found` });
		}
	} catch (error) {
		next(error);
	}
};

const checkCarPayload = (req, res, next) => {
	const post = await Cars.create();
};

const checkVinNumberValid = (req, res, next) => {
	// DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
	// DO YOUR MAGIC
};

module.exports = {
	checkCarId,
	checkVinNumberUnique,
	checkCarPayload,
	checkVinNumberValid,
};
