const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

const Cars = {
    getAll() {
        return db('car-dealer')
    },
    getById(id) {
        return db('car-dealer')
        .where({ id })
    },
    create(car) {
        return db('car-dealer')
        .insert(car)
    },
    async update(id, car) {
        return db('car-dealer')
        .where({ id })
        .update(car)

    },
    delete(id) {
        return db('car-dealer')
        .where({ id })
        .del()
    }
}

router.get('/', (req, res) => {
    Cars.getAll()
    .then(cars => {
        res.status(200).json({ data: cars })
    })
    .catch(error => {
        res.status(500).res.json({
            message: error.message
        })
    })
})

router.get('/:id', (req, res) => {
    Cars.getById(req.params.id)
    .then(data => {
        //it empty data set do something different
        if(!data.length) {
            res.json({
                message: 'no car with that id'
            })
        } else {
            res.json(data[0])
        }
        // res.json(data)
    })
    .catch(error => {
        res.json({
            message: error.message
            })
        })
    })

    router.post('/', (req, res) => {
        Cars.create(req.body)
        .then(([id]) => {
            return Cars.getById(id).first()
        })
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    });

    router.put('/:id', async (req, res) => {
        try {
            await Cars.update(req.params.id, req.body)
            const updatedCar = await Cars.getById(req.params.id).first()
            res.json(updatedCar)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
        });
        router.delete('/:id', async (req, res) => {
            try {
                const deletedCar = await Cars.delete(req.params.id)
                if(!deletedCar) {
                    res.json({ message: 'no Car with given id' })
                } else {
                    res.json({ message: 'Car removed from DB successfully' })
                }
            } catch (error) {
                res.json({ message: error.message })
            }
        });

        module.exports = router;