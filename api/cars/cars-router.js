const express = require('express');
const Cars = require('./cars-model');
const {
	checkCarId,
	checkVinNumberUnique,
	checkCarPayload,
	checkVinNumberValid,
} = require('./cars-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const getCar = await Cars.getAll();
		res.json(getCar);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', checkCarId, async (req, res, next) => {
	res.json(req.car);
});
router.post(
	'/',
	checkVinNumberUnique,
	checkCarPayload,
	checkVinNumberValid,
	async (req, res, next) => {
		try {
			const car = await Cars.create(req.body);
			res.json(car);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
