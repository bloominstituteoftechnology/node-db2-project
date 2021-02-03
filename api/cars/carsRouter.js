const express = require("express");
const router = express.Router();

const {
  getCars,
  insertCar,
  getCarByID,
  updateCar,
  removeCar,
} = require("./carsModel");

router.get("/", async (req, res, next) => {
  try {
    const cars = await getCars();
    res.status(200).json(cars);
  } catch (err) {
    err.message = "can't get list of cars form the server.";
    err.statusCode = 500;
    next(err);
  }
});

router.get("/:id", checkId, (req, res, next) => {
  const car = req.car;
  res.status(200).json(car);
});

router.post("/", checkPayload, async (req, res, next) => {
  const newCar = req.car;
  try {
    const id = await insertCar(newCar);
    res.status(201).json({
      id,
      ...newCar,
      transmissionType: newCar.transmissionType || null,
      titleStatus: newCar.titleStatus || null,
    });
  } catch (err) {
    err.message = "can't post a car to the server.";
    err.statusCode = 500;
    next(err);
  }
});

router.put("/:id", checkId, checkPayload, async (req, res, next) => {
  const { id } = req.params;
  const changes = req.car;

  try {
    const count = await updateCar(id, changes);
    if (count === 1) {
      res.status(200).json({
        id,
        ...changes,
        transmissionType: changes.transmissionType || null,
        titleStatus: changes.titleStatus || null,
      });
    } else {
      err = new Error();
      err.message = "Server failed to update record.";
      err.statusCode = 500;
      next(err);
    }
  } catch (err) {
    err.message = "can't update the car in the server.";
    err.statusCode = 500;
    next(err);
  }
});

router.delete("/:id", checkId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const count = await removeCar(id);
    if (count === 1) {
      res.sendStatus(204);
    } else {
      err = new Error();
      err.message = "Server failed to delete record.";
      err.statusCode = 500;
      next(err);
    }
  } catch (err) {
    err.message = "can't delete car in server.";
    err.statusCode = 500;
    next(err);
  }
});

async function checkId(req, res, next) {
  const { id } = req.params;
  try {
    const car = await getCarByID(id);
    if (!car) {
      err = new Error();
      err.message = "vehicle not found";
      err.statusCode = 404;
      next(err);
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    err.message = "Server error.";
    err.statusCode = 500;
    next(err);
  }
}

function checkPayload(req, res, next) {
  const body = req.body;
  if (!body.VIN || !body.make || !body.model || !body.mileage) {
    err = new Error();
    err.message = "You must enter a VIN, make, model,  mileage of the car.";
    err.statusCode = 400;
    next(err);
  } else if (!Number(body.VIN)) {
    err = new Error();
    err.message = "VIN must be an integer";
    err.statusCode = 400;
    next(err);
  } else if (!Number(body.mileage)) {
    err = new Error();
    err.message = "Mileage must be an integer";
    err.statusCode = 400;
    next(err);
  } else {
    req.car = body;
    next();
  }
}

module.exports = router;