const router = require("express").Router();
const Car = require("./cars-model");

const { checkCarId } = require("./cars-middleware");

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

module.exports = router;
