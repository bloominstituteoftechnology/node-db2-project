# STUBS

## ROUTERS
```javascript
const express = require('express');
const Cars = require('./cars-model');

const router = express.Router();
const{
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    res.json("get all cars wired/fired");
});

router.get('/:id', async (req, res, next) => {
    res.json(`get car by id ${req.params.id}wired/fired`);
});

router.post('/', async (req, res, next) => {
    res.json("post cars wired/fired");
});

router.put('/:id', async (req, res, next) =>{
    res.json("PUT with id wired/fired");
});

router.delete('/:id', async (req, res, next) => {
    res.json("delete wired/fired");
});

module.exports = router;
```