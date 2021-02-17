const express = require("express");
const router = express.Router();
const carsModel = require("./cars-model");

router.get('/' , async (_, res) => {
    try {
        const cars = await carsModel.get();
        res.status(200).json(cars);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});


router.post('/',  async (req, res) => {

    try {
        const data = await carsModel.create(req.body);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({message: err.message});
    }

});


module.exports = router;