const knex = require('knex');

const router = require('express').Router();



const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/zoos.db3'
    },
    useNullAsDefault: true
};

const db = knex(knexConfig);


router.post('/api/zoos', (req, res) => {
    res.send('');
});

router.get('/api/zoos', (req, res) => {
    res.send('');
});

router.get('/api/zoos/:id', (req, res) => {
    res.send('');
});

router.delete('/api/zoos/:id', (req, res) => {
    res.send('');
});

router.put('/api/zoos/:id', (req, res) => {
    res.send('');
});


module.exports = router;