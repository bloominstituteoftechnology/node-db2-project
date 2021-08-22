const router = require('express').Router()
const Cars = require('./cars-model.js')
const mw = require('./cars-middleware.js')
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = mw

router.get('/', async (req, res, next) => {
  try {
    const data = await Cars.getAll()
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    res.status(200).json(req.car)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkVinNumberValid,checkVinNumberUnique, checkCarPayload, async (req, res, next) => {
  try {
    const data = await Cars.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkCarId, checkVinNumberValid, checkVinNumberUnique, checkCarPayload, async (req, res, next) => {
  try {
    const data = await Cars.updateById(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkCarId, async (req, res, next) => {
  try {
    const data = await Cars.deleteById(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err,  req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
