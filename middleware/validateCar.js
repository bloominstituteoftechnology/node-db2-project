function validateCar(req, res, next) {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing car data" });
  } else if (!body.VIN || !body.make || !body.model || !body.mileage) {
    res
      .status(400)
      .json({ message: "missing required VIN, make, model, mileage field" });
  } else {
    next();
  }
}

module.exports = validateCar;
