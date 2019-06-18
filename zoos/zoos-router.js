const knex = require('knex');

const router = require('express').Router();



const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/zoos.db3',
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
        res.status(200).json(zoos);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});


router.post('/api/zoos', (req, res) => {
 
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