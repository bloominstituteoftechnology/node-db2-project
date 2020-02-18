const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    

})


module.exports = router
