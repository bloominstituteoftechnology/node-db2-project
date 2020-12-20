const express = require('express');
const db = require('../../data/config');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cars = await db.select('*').from('cars');
        res.json(cars);
    }
    catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const car = await db.first().from('cars').where('id', req.params.id);
        if (!car) {
            res.status(404).json({
                message: 'Car not found',
            })
        } else {
            res.json(car);
        }
    }
    catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if(!req.body.VIN || 
            !req.body.make || 
            !req.body.model ||
            !req.body.mileage) {
                res.status(400).json({
                    message: 'We need more data',
                })
            }

        const payload = {
            VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmission: req.body.transmission || 'unknown',
            titleStatus: req.body.titleStatus || 'unknown',
        }

        const id = await db.insert(payload).into('cars');

        const message = await db.first().from('cars').where('id', id);
        res.status(201).json(message);
    }
    catch(err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        if(!req.body.VIN || 
            !req.body.make || 
            !req.body.model ||
            !req.body.mileage) {
                res.status(400).json({
                    message: 'We need more data',
                })
            }

        const id = await db.first().from('cars').where('id', req.params.id);

        if(id) {
            const payload = {
                VIN: req.body.VIN,
                make: req.body.make,
                model: req.body.model,
                mileage: req.body.mileage,
                transmission: req.body.transmission || 'unknown',
                titleStatus: req.body.titleStatus || 'unknown',
            }

            await db.select('*').from('cars').where('id', req.params.id).update(payload);

            const message = await db.first().from('cars').where('id', id);
            res.json(message);
        } else {
            res.status(404).json({
                message: 'cannot update what we do not have'
            })
        }
    }
    catch(err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = await db.first().from('cars').where('id', req.params.id);
        if(id) {
            await db.select('*').from('cars').where('id', req.params.id).del();
            res.status(204).end();
        }
    }
    catch(err) {
        next(err);
    }
})

module.exports = router;