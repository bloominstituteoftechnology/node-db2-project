const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.post('/api/zoos',    (req, res)  =>  {
    const animal = req.body;
    db('zoos').insert(animal)
        .then(ids   =>  {
            res.status(201).json(ids)
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not inser animal" });
        })
})

server.get('/api/zoos', (req, res)  =>  {
    db('zoos')
        .then(rows   =>  {
            res.json(rows);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not get animals" });
        })
})

server.get('/api/zoos/:id', (req, res)  =>  {
    const { id } = req.params;
    db('zoos').where('id', id)
        .then(rows   =>  {
            if(rows.length === 0)   {
                res.status(400).json({ error: "Could not find the animal with the specified id" });
            }
            res.json(rows);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not complete the request" });
        })
})

server.put('/api/zoos/:id',  (req, res)  =>  {
    const { id }    =   req.params;
    const animal    =   req.body;
    db('zoos').where('id', id)
        .update(animal)
        .then(rowCount  =>  {
            if(rowCount   === 0)    {
                res.status(400).json({ message: "Could not find the animal with the specified id" });
            }
            res.json(rowCount);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not update the animal" });

        })
})

server.delete('/api/zoos/:id',  (req, res)  =>  {
    const { id }    =   req.params;
    db('zoos').where('id',  id)
        .del()
        .then(rowCount  =>  {
            if(rowCount === 0)  {
                res.status(400).json({ message: "Could not find an animal with the specified id"} );
            }
            res.json(rowCount);
        })
        .catch(err  =>  {
            res.status(500).json({ message: "Could not delete animal" });
        })
})
