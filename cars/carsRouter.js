const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve cars' });
    }
});

router.post('/', async (req, res) => {
    try {
        const car = req.body;
        const [id] = await db('cars').insert(car);
        const newCarEntry = await db('cars').where({ id });

        res.status(201).json(newCarEntry);
    } catch (err) {
        res.status(500).json({ message: 'Failed to store data' });
    }
})

module.exports = router;