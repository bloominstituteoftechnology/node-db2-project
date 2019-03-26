const router = require('express').Router();

const knex = require('knex');
const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3',
    },
    // debug: true,
};
const db = knex(knexConfig);

router.post('/', (req,res) => {
    db('zoos').insert(req.body)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => res.status(500).json(err));
});

router.get('/', (req,res) => {
    db('zoos')
        .then(zoo => {
            res.status(200).json(zoo);
        })
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req,res) => {
    db('zoos').where({id: req.params.id}).first()
        .then(zoo => {
            if (zoo) {
                res.status(200).json(zoo)
            } else {
                res.status(404).json({error:'Record not found'});
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;