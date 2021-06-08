// DO YOUR MAGIC
const router = require('express').Router();
const mw = require('./cars-middleware');
const Car = require('./cars-model');

//`[GET] /api/cars`
//returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', async (req, res, next)=>{
    try{
        const cars = await Car.getAll();
        res.json(cars);
    }//end of try
    catch(err){
        next(err);
    }
})
//`[GET] /api/cars/:id`
//returns a car by the given id.
router.get('/:id', mw.checkCarId, async (req,res,next)=>{
    try{
        res.status(200).json(req.car);
    }//end of try
    catch(err){
        next(err)
}
})

//`[POST] /api/cars
// returns the created car.
router.post('/',mw.checkCarPayload,mw.checkVinNumberValid, mw.checkVinNumberUnique, async(req,res,next)=>{
    const body = req.body
    console.log("BODY!!!",body);
    try{
        const car = await Car.create(body)
        console.log("CAR!!",car)
        res.json(car)
    }//end of try
    catch(err){
        next();
    }//end of catcg
})
//DON"T FORGET THIS!!!!
router.use((err, req, res, next) => {
    res.status(err.status || 404).json({
      message:err.message
    })
  })

module.exports = router;