const express = require('express')
const server = express();
const Db = require('./data/seeds/db')
server.use(express.json())
server.get("/", function(request, response) {
    response.send({test:'This is a test'})
})

server.post("/api/cars", function(req, res) {
    const {Vin, make} = req.body;
    if (!Vin || !make)
    return res.status(400).json({errorMessage: "Please provide Vin and make for the user." })
    Db.insert({Vin, make})
    .then(car => {
        res.status(201).json(car)
    })
    .catch(error => {
        res.status(400).json({errorMessage: "Couldn't add to database." })
    })
})
    

server.get("/api/cars", (req, res ) =>{
    Db.find()
    .then(cars => {
        console.log('Cars', cars)
        res.status(200).json(cars)
    })
})
const port = 4000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
