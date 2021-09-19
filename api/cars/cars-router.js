const router = require("express").Router();
const Car = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch(next);
});

// eslint-disable-next-line
router.get("/:id", checkCarId, async (req, res, next) => {
  res.json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const car = await Car.create(req.body);
      res.json(car);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
