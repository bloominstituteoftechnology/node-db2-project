const router = require("express").Router();

const { checkCarId } = require("./cars-middleware.js");

const Car = require("./cars-model.js");

router.use((err, req, res) => {
  // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
