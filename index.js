const express = require('express');
const knex = require('./data/dbConfig.js');


const server = express();
// const carRouter = require('./routers/carRouter')
server.use(express.json());

// server.use('/cars', carRouter)




server.get('/', (req, res) => {
    res.send('<h3>DB migrations</h3>');
});

server.get('/cars', (req, res) => {
    knex('cars').then(carss => {
        res.status(200).json(carss)
    })
    .catch(err => {
        res.status(500).json({error:"failed to get cars"});
    })
});

server.post('/cars',(req,res) => {
    knex.insert(req.body).into('cars').then(obj => {
        res.status(200).json(obj)
    })
    .catch(err => {
        res.status(500).json({error:"failed to insert car"});
    })
});

server.put('/:id', (req,res) => {
        const id = req.params.id;
        const update = req.body;

        knex('cars').where({id:id}).update(update).then(object => {
            res.status(200).json(object)
        })
        .catch(err => {
            res.status(500).json({error:"failed to update car"});
        })
});

server.delete('/:id', (req,res) => {
    const id = req.params.id;
    knex('cars').where({id:id}).del().then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({error:"failed to update post"});
    })
})

const PORT = process.env.PORT || 7777;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});