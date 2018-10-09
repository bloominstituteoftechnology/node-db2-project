const express = require('express');
// const actionsTable = require('../data/helpers/actionModel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes


router.use(errorHandler);

module.exports = router;
