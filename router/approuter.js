const express = require("express");

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const db = require('../data/dbconfig')

//Route Server

// add any models you will use
server.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars)
        })
        .catch(err => console.log(err))
} )

// Asycn Wait call for Knex
server.get('/async', async (req, res, next) => {
    try {
        const data = await db.select("*").from('accounts')
        res.status(200).json({data: data})
    } catch (error) {
        next(error)
    }
})
//export your router
module.exports = server