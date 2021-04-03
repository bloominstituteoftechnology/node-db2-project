// DO YOUR MAGIC


const express = require ("express");


const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require ("./cars-middleware");

const Cars = require("./cars-model"),

const router = express.Router();


router.get("/", async (req, res, next) => {

    try {
        const cars = await Cars.getAll();
        res.status(201).json(cars);

    } catch (err) {
        next(err)
    }
    });


    router.get("/:id", checkCarId, async (req, res, next) => {
        try {
          res.json(req.car);
        } catch (err) {
          next(err);
        }
      });

      router.post(
        "/",
        checkCarPayload,
        checkVinNumberValid,
        checkVinNumberUnique,
        async (req, res, next) => {
          try {
            const addCar = await Cars.create(req.body);
            if (addCar) {
              res.json(addCar);
            }
          } catch (err) {
            next(err);
          }
        }
      );


      router.use((err, req, res, next) => {
        // eslint-disable-line
      
        // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
        res.status(500).json({
          message: "something went wrong inside the cars router",
          errMessage: err.message,
        });
      });
      
      module.exports = router;
