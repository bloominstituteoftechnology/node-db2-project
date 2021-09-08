const express = require('express');
const Cars = require('./cars-model');
const {
	checkCarId,
	checkVinNumberUnique,
	checkCarPayload,
	checkVinNumberValid,
} = require('./cars-middleware');
const { json } = require('express');

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
	'/:id',
	checkVinNumberUnique,
	checkCarPayload,
	checkVinNumberValid,
	async (req, res, next) => {}
);

module.exports = router;
