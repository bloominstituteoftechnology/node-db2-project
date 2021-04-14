const cars = require("./cars-model.js")
const mw = require("./cars-middleware.js")
const router = require('express').Router()

router.get("/", (req,res)=>{
    cars.getAll()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: err.message});
    })
});

router.get("/:id", mw.checkCarId, (req,res)=>{
    cars.getById(req.params.id)
    .then(car=>{
        res.status(200).json(car);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: err.message});
    })
});

router.post("/", mw.checkCarPayload, mw.checkVinNumberUnique, mw.checkVinNumberValid, (req,res) => {
    cars.create(req.body)
    .then(car=>{
        res.status(201).json(car);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: err.message});
    })
});

router.put("/:id", mw.checkCarId ,mw.checkCarPayload, mw.checkVinNumberUnique, mw.checkVinNumberValid, (req,res) => {
    cars.updateById(req.params.id, req.body)
    .then(async ()=>{
        const car = await cars.getById(req.params.id)
        res.status(200).json(car);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: err.message});
    })
});

router.delete('/:id', mw.checkCarId, (req, res) => {
    cars.deleteById(req.params.id)
    .then(car=>{
        res.status(200).json(car);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: err.message});
    })
})
module.exports = router