const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const server = express();

server.use(express.json());
server.use(helmet());

knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig)


server.post('/api/zoos', (req, res) => {
    db('zoos').insert(req.body)
        .then(ids => {
            db('zoos')
                .where({id: ids[0]})
                .first()
                .then(newResource => res.status(200).json(newResource))
        })
        .catch(err => res.status(500).json({err: err}))
});

server.get('/api/zoos', (req, res) => {
    db('zoos')
        .then(results => res.json(results))
        .catch(err => res.json({err: 'err'}))
});

server.get('/api/zoos/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .first()
        .then(newResource => res.json(newResource))
        .catch(err => res.json(err))
})

server.put('/api/zoos/:id', (req,res) => {
    db('zoos')
        .where({id:req.params.id}).update(req.body)
        .then(resource => res.json(resource))
        .catch(err => res.json(err))
})

server.delete('/api/zoos/:id', (req,res) => {
    db('zoos')
        .where({id:req.params.id})
        .del()
        .then(count => res.json(count))
        .catch(err => res.json(err))
})


const port = 8000;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
