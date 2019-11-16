const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();



// READ /api/cars
router.get("/", () => {
   db('cars')
   .select('*')
   .then(cars => {
      res.status(200).json(cars)
   })
   .catch(err => {
      res.status(500).json({
         Message: "Problem with database."
      })
   })
});


// CREATE  /api/cars
router.post("/", () => {
   const carData = req.body;

});



module.exports = router;
