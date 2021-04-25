// DO YOUR MAGIC
const router = require('express').Router()
const db = require('./cars-model')
const {checkCarId} = require("./cars-middleware")


router.get("/", async (req, res, next) => {
  const getAll = await db.getAll()
    res.status(200).json(getAll)
})


router.get("/:id", checkCarId, async (req,res,next) => {
  const getCar = await db.getById(req.params.id)
    res.status(200).json(getCar)

})



module.exports = router