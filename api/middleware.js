const dbModel= require('./cars-model');

module.exports={
    validateId,
    validateBody
}

async function validateId(req,res,next){
    const [cars]=await dbModel.getById(req.params.id)
    if(cars){
        req.cars=cars;
        next();
    }else{
        const err=new Error('Given ID does not exist')
        err.statusCode=404;
        next(err)
    }
}

function validateBody(req,res,next){
    const body=req.body;
    if(!body.VIN || !body.make || !body.model || !body.mileage){
        res.status(400).json({message: "Please provide VIN,make,model and mileage"})
    }else{
        next();
    }
}