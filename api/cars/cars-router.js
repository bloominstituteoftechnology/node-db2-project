const express = require('express');

const router = express.Router();

router.get('/', async(req, res) => {
    await res.json({message: 'Hello World'});
});

module.exports = router;
