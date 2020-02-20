const express = require('express');
const server = express();

server.use(express.json());

const database = require('./data/dealerDB.js');

server.get('/', (req, res) => {

    database.getAll().then(cars => {
        res.status(200).json(cars);
    }).catch(err => {

        console.log(err);
        res.status(500).json({error: 'An error has occured!'});

    });

});

server.get('/:VIN', (req, res) => {

    if (req.params.VIN === undefined)
        res.status(400).json({ error: 'Please the VIN number of the car.' });

    database.getByVin(req.params.VIN).then(car => {
        res.status(200).json(car);
    }).catch(err => {

        console.log(err);
        res.status(500).json({error: 'An error has occured!'});

    });

});

server.post('/', (req, res) => {

    // console.log(req.body);

    database.insert(req.body).then(result => {

        console.log(result);
        database.getByVin(result.vin).then(car => {
            res.status(201).json({car});
        });

    }).catch(err => {

        console.log(err);
        res.status(500).json({error: 'There was an error while saving the car to the database!'});

    });

});

server.listen(5000, '127.0.0.1', () => console.log('Server listening on port 5000.'));