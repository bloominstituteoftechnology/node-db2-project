const router=require('express').Router();
const {validateId,validateBody} = require('./middleware');
const dbModel=require('./cars-model');

router.get('/', async (req,res,next)=>{
    try {
        const cars= await dbModel.get();
        res.status(200).json(cars);
    } catch (err) {
        next(err);   
    }
    
})

router.get('/:id', validateId, async(req,res,next)=>{
   try {
    res.status(200).json(req.cars);
   } catch (err) {
       next(err)
   }
})

router.post('/',validateBody,async (req,res,next)=>{
   try {
        const [posted]= await dbModel.create(req.body)   
        res.status(201).json(posted)
   } catch (err) {
      next(err) 
   }
})

router.put('/:id',validateId, validateBody, async(req,res,next)=>{
    try {
        const [updated] = await dbModel.update(req.params.id,req.body)
        res.status(200).json(updated);
    } catch (err) {
        next(err)
    }
})

router.delete('/:id',validateId, async (req,res,next)=>{
    try {
        const deleteCount = await dbModel.remove(req.params.id);
        if(deleteCount === 1){
            res.status(200).json({message: "delete success"})
        }else{
            res.status(400).json({message: "unable to delete"})
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:id/sale',validateId, async (req,res,next)=>{
    try {
        const sale= await dbModel.getCarSale(req.params.id)
        res.status(200).json(sale);
    } catch (err) {
        next(err)
    }
})
module.exports=router;