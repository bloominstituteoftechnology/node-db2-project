const router = require('express').Router()
const Cars = require('./cars-model.js')
const mw = require('./cars-middleware.js')
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware.js')

router.get('/', async (req, res, next) => {
  try {
    const data = await Cars.getAll()
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkCarId, async (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', checkVinNumberValid,checkVinNumberUnique, checkCarPayload, async (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', checkCarId, checkVinNumberValid, checkVinNumberUnique, checkCarPayload, async (req, res, next) => {

})

router.delete('/:id', checkCarId, async (req, res, next) => {

})

router.use((err,  req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
