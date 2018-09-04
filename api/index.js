const router = require('express').Router();

router.use('/zoos', require('./zoos'));
router.use('/bears', require('./bears'));

module.exports = router;
