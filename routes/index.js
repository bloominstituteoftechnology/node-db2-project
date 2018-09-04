const express = require('express');

const zooRoutes = require('./zooRoutes.js');
const bearRoutes = require('./bearRoutes.js');

const router = express.Router();

router.use('/zoos', zooRoutes);
router.use('/bears', bearRoutes);

module.exports = router;