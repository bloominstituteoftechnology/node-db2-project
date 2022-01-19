// DO YOUR MAGIC
const router = require("express").Router();

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const Cars = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    const car = await Cars.getAll();
    res.json(car);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.cars);
});

router.post(
    "/",
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    async (req, res, next) => {
      try {
        const car = await Cars.create(req.body);
        res.json(car);
      } catch (error) {
        next(error);
      }
    }
  );
  
  router.use((err, req, res, next) => { //eslint-disable-line
    // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
  
  module.exports = router;