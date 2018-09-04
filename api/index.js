const router = require('express').Router();

router.use('/zoos', require('./zoos'));

module.exports = router;
