const express = require('express');
const Sales = require('./sales-model');

const router = express.Router();

router.get('/api/sales', async (req, res, next) => {
    try {
        const sales = await Sales.getAllSales();
        res.status(200).json(sales);
    } catch (err) {
        next(err);
    }
})

router.get('/api/sales/:carId', async (req, res, next) => {
    try {
        const sale = await Sales.getSaleById(req.params.carId);
        res.status(200).json(sale);
    } catch (err) {
        next(err);
    }
})

router.post('/api/sales', async (req, res, next) => {
    try {
        const newSale = await Sales.addNewSale(req.body);
        res.status(201).json(newSale);
    } catch (err) {
        next(err);
    }
})

module.exports = router;
