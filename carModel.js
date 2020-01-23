const express = require('express');
const Info = require('./seeds/cars_tables');

const carModels = express.Router();


carModels.post('/add', (req, res) => {
    Info.insert(req.body)
.then(info => {
    if (info) {
  res.status(201).json(info);
    } else {
        res.status(500).json({message: 'cannot add Projectt'})
    }
})
.catch(error => {
  // log error to projectModels
  console.log(error);
  res.status(500).json({
    message: 'Error adding the Port',
  });
});
});


carModels.get('/', (req, res) => {
    // do your magic!
    Info.get()
        .then(info => {
        res.status(200)
        .json(info);
      })
      .catch(err => {
        console.log("error on GET /users", err);
        res.status(500)
          .json({ error: "The users information could not be retrieved." });
      });
  });

  module.exports = carModels;