const express = require('express');

const db = require('../../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(error => {
            next(error)
        });
});

router.get('/:id', (req, res, next) => {
    db('cars')
        .where({ carId: req.params.id })
        .then(car => {
            if(car.length)
                res.status(200).json(car);
            else
                res.status(404).json({message:'A car with that id does not exist.' });
        })
        .catch(error => {
            next(error)
        });
});

router.post('/', (req, res) => {
    const newCar = req.body;
    db('cars')
        .insert(newCar)
        .then(id => {
            res.status(201).json({ message: `A car with id ${id} was added.` });
        })
        .catch(error => {
            next(error)
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('cars')
        .update(changes)
        .where({ carId: req.params.id })
        .then(amt => {
            if(amt)
                res.status(200).json({ message: `${amt} record was updated.` });
            else
                res.status(404).json({message:'A car with that id does not exist.' });
        })
        .catch(error => {
            next(error)
        });
});

router.delete('/cars/:id', (req, res) => {
    db('cars')
        .where({ carId: req.params.id })
        .delete()
        .then(amt => {
            if(amt)
                res.status(200).json({ message: `${amt} record was deleted.` });
            else
                res.status(404).json({message:'A car with that id does not exist.' });
        })
        .catch(error => {
            next(error)
        });
});

module.exports = router;
