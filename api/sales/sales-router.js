const express = require('express');
const Sales = require('./sales-model');

const router = express.Router();

router.get('/sales', async (req, res, next) => {
    try {
        const sales = await Sales.getAllSales();
        res.status(200).json(sales);
    } catch (err) {
        next(err);
    }
})

router.get('/sales/:id', async (req, res, next) => {
    try {
        const sale = await Sales.getSaleById(req.params.id);
        res.status(200).json(sale);
    } catch (err) {
        next(err);
    }
})
