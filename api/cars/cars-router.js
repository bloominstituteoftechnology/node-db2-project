// DO YOUR MAGIC
const router = require('express').Router();


const Cars = require('./cars-model');

router.get('/', (req, res) => {

})

router.get(':/id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router