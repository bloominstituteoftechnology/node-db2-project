// const express = require('express');

// const zoos = require('../data/zoosModel.js')

// const router = express.Router();

// router.post('/', (req, res) => {
//     const zoo = req.body;
    
//     zoos
//         .add(zoo)
//         .then(ids => {
//             res.status(201).json(ids[0]);
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });