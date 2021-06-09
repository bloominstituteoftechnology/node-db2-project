// DO YOUR MAGIC
const express = require('express')

const Car = require('./cars-model')
const router = require('express').Router()

const md = require('./cars-middleware')


router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id',
    md.checkCarId,
    async (req, res, next) => {
        res.json(req.car)
})

router.post('/',
    md.checkCarPayload,
    md.checkVinNumberValid,
    md.checkVinNumberUnique,
    async (req, res, next) => {
        try {
            const data = await Car.create(req.body)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
})
module.exports = router;