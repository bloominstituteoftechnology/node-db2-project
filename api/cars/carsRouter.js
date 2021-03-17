const express = require("express");
const Car = require("./carsModel");

const router = express.Router();
const checkID = async (req, res, next) => {
  const { id } = req.params;
  const idExist = await Car.findById(id);
  if (idExist) {
    next();
  } else {
    res.status(400).json({ message: `ID ${id} does not exist!` });
  }
};

const checkPayload = (req, res, next) => {
  const { VIN, Make, Model, Miles } = req.body;
  if (VIN && Make && Model && Miles) {
    next();
  } else {
    res.status(400).json({ message: "Name and Budget required!" });
  }
};

router.get("/", async (req, res, next) => {
  try {
    const data = await Car.find();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", checkID, async (req, res, next) => {
  try {
    const data = await Car.findById(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.post("/", checkPayload, async (req, res, next) => {
  try {
    const body = req.body;

    const data = await Car.post(body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
