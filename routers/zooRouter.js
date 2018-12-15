const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('post request');
});

router.get('/', (req, res) => {
    res.send('get request');
});

router.get('/:id', (req, res) => {
    res.send('get request with id');
});

router.put('/:id', (req, res) => {
    res.send('put request');
});

router.delete('/:id', (req, res) => {
    res.send('delete request');
});

module.exports = router;