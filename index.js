const express = require('express');

const db = require('./data/dbConfig')

const server = express();

//middleware
server.use(express.json());

// request handlers
server.get('/', (req, res) => {
    res.send("Hello, I'm working!");
});

server.get('/api/cars', (req, res) => {
    db.find()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The users information could not be retrieved.'
        })
    })
});

server.post('/api/cars', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the user to the database'
        })
    })
})




server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});