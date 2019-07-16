const express = require('express');
const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/cars.db3'
    },
    useNullAsDefault: true
});

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve cars' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fruit = await db('cars').where({ id });

        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve car' });
    }
});

router.post('/', async (req, res) => {
    try {
        const carData = req.body;
        const [id] = await db('cars').insert(carData);
        const newCarEntry = await db('cars').where({ id });

        res.status(201).json(newCarEntry);
    } catch (err) {
        console.log('POST error', err);
        res.status(500).json({ message: "Failed to store data" });
    }
});


module.exports = router;