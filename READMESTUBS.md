# STUBS

## ROUTERS
```javascript
const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');

const{
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

router.get('/', (req, res, next) => {
    res.json("get request wired/fired");
});

router.get('/:id', (req, res, next) => {
    res.json(`get cars by id ${req.params.id}wired/fired`);
});

router.post('/', (req, res, next) => {
    res.json("post cars wired/fired");
});

router.put('/:id', (req, res, next) =>{
    res.json("PUT with id wired/fired");
});

router.delete('/:id', (req, res, next) => {
    res.json("delete wired/fired");
});

module.exports = router;
```