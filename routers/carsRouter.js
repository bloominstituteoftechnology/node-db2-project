const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    db('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(err => {
        res.status(404).json({ error: `${err} cars not found`})
    })

})

router.get("/:id", (req, res) => {
    const { id } = req.params
    db('cars')
        .where({ id })
        .first()
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.status(404).json({ error: `${err} car not found`})
        })
})

router.post("/", (req, res) => {
    
    db('cars')
        .insert(req.body)
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(err => {
            res.status(404).json({ error: `${err} car not created`})
        })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const updated = req.body
    db('cars')
        .where({id})
        .update(updated)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.status(404).json({ error: `${err} car not updated`})
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    db('cars')
        .where({ id })
        .delete()
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(404).json({ error: `${err} car not deleted`})
        })
})


module.exports = router
