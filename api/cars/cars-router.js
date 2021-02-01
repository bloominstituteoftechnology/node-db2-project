const express = require('express')
const router = express.Router();

const {getCars,
    getCarByID,
    insertCar,
    updateCar,
    removeCar
} = require('./cars-model')


router.get('/', async (req,res,next) => {
try {
    const cars = await getCars();
    res.status(200).json(cars);
} catch (err) {
    next(err)
}
});

router.get("/:id", (req,res,next) => {
    const car = req.car;
    res.status(200).json(car);
});

router.post("/", async (req,res,next) => {
    const addCar = req.car;
    try{
        const id = await insertCar(addCar);
        res.status(201).json({
            id,
            ...addCar,
            TransmissionType: addCar.TransmissionType || null,
            TitleStatus: TitleStatus.addCar || null,
        });
    } catch (err) {
        next(err)
    }
})

router.put("./:id", async (req,res,next) => {
    const {id} = req.params
    const changes = req.car;

    try {
        const count = await updateCar(id, changes);
        if (count === 1) {
          res.status(200).json({
            id,
            ...changes,
            TransmissionType: changes.TransmissionType || null,
            TitleStatus: changes.TitleStatus || null,
          });
        } else {
          err = new Error();
          err.message = "Server failed to update record.";
          err.statusCode = 500;
          next(err);
        }
      } catch (err) {
        next(err)

      }
    });

    router.delete("/:id", async (req,res,next) => {
        const {id} = req.params

        try{
            const count = await deleteCar(id);
            if (count === 1) {
                res.status(200)
            } else {
                next(err)
            }
        } catch (err) {
            next(err)
    
        }
    })

module.exports = router;