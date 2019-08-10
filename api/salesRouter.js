const express = require('express');
const db = require('../data/db-config')

const salesRouter = express.Router();

salesRouter.get('/' , async (req,res) => {
    try {
        const sales = await db('sales');
        res.status(200).json(sales);
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem with your request'});
    }
})

salesRouter.post('/' , async (req,res) => {
    try {
        const newSalesBody = req.body;
        const newSales = await db('sales').insert(newSalesBody);
        res.status(200).json(newSales);
    }

    catch (err) {
        res.status(500).json({message:'There was a problem with your request'});
    }
})


module.exports = salesRouter;