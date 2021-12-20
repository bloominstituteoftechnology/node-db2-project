// DO YOUR MAGIC
const express = require('express')
const res = require('express/lib/response')

const router = express.Router()

// end points


router.get('/', async(res, res, next) => {
    res.json('getting all cars')
})

router.get('/', async(res, res, next) => {
    res.json(`getting car with id ${req.params.id}`)
})

router.post('/', async(res, res, next) => {
    res.json('posting new car')
})

module.exports = router