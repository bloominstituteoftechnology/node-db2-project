const express = require('express');

//routes
const zooRoutes = require('./zoos');
const bearRoutes = require('./bears');

const router = express.Router();

router.use('/zoos', zooRoutes);
// router.use('/bears', bearRoutes);

module.exports = router;
