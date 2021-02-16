const express = require('express')
const router = express.Router();

const Car = require('./cars-model')


router.get('/', async (req,res,next) => {
try {
    const cars = await Car.get();
    res.status(200).json(cars);
} catch (err) {
    next(err)
}
});

router.post("/", async (req,res,next) => {
    const car = req.body;
    try{
        const id = await Car.insert(car);
        res.status(201).json({
            id,
            ...car,
            TransmissionType: car.TransmissionType || null,
            TitleStatus: TitleStatus.car || null,
        });
    } catch (err) {
        next(err)
    }
})

router.put("/:id", async (req,res,next) => {
    const {id} = req.params
    const changes = req.car;

    try {
        const count = await Car.update(id, changes);
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
            const count = await Car.remove(id);
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