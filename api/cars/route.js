const router = require("express").Router();

const {
  getCars,
  getCarByDetail,
  addCar,
  updateCar,
  deleteCar
} = require("./model.js");

// gets all cars
router.get("/", (req, res) => {
  getCars()
    .then(cars => res.status(200).json({ cars }))
    .catch(err =>
      res.status(500).json({
        message: "Something went wrong in getting cars",
        error_message: err.message
      })
    );
});

// gets cars by id uri param
router.get("/:id", (req, res) => {
  getCarByDetail({ id: req.params.id })
    .then(car => res.status(200).json({ car }))
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong trying to get that car by id.",
        error_message: err.message
      })
    );
});

// adds a car to database
// needs: {vin, make, model, year, mileage}
// opt: {transmission_type, title_status}
router.post("/", (req, res) => {
  addCar(req.body)
    .then(newCar => res.status(201).json({ newCar }))
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong in adding this car.",
        error_message: err.message
      })
    );
});

// update car by id
router.put("/:id", (req, res) => {
  let id = req.params.id;
  let updates = req.body;
  updateCar(id, updates)
    .then(updated => res.status(200).json(updated))
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong in updating car with that id.",
        error_message: err.message
      })
    );
});

// delete car by id
router.delete("/:id", (req, res) => {
  deleteCar(req.params.id)
    .then(() =>
      res.status(200).json({ success: "car deletion was successful" })
    )
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong in deleting that car.",
        error_message: err.message
      })
    );
});

module.exports = router;
