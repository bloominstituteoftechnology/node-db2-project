const router = require("express").Router();
const Car = require("./cars-model");

router.get("/", (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch(next);
});

module.exports = router;
