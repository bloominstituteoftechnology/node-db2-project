const router = require("express").Router();

const {
  getSales,
  getSaleByDetail,
  addSales,
  updateSales,
  deleteSales
} = require("./model.js");

// gets all sales
router.get("/sales", (req, res) => {
  getSales()
    .then(sales => res.status(200).json({ sales }))
    .catch(err =>
      res.status(500).json({
        message: "Something went wrong in getting sales",
        error_message: err.message
      })
    );
});

// car id is needed from here to verify that the sale belongs to a car

// gets sale by id uri param
router.get("/cars/:car_id/sales/:sale_id", (req, res) => {
  // could create middleware to verify that the sale with this id is attached to the car id given.
  getSaleByDetail({ id: req.params.sale_id })
    .then(sale => res.status(200).json({ sale }))
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong trying to get that sale by id.",
        error_message: err.message
      })
    );
});

// adds a sale to database
// needs {sold_by, final_price}
router.post("/cars/:car_id/sales", (req, res) => {
  // car_id needs to be a part of the body.
  const sold = {
    car_id: req.params.car_id,
    ...req.body
  };
  addSales(sold)
    .then(newCarSale => res.status(201).json({ newCarSale }))
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong in adding this car sale.",
        error_message: err.message
      })
    );
});

// update sale by id
router.put("/cars/:car_id/sales/:sale_id", (req, res) => {
  let id = req.params.sale_id;
  const updates = {
    car_id: req.params.car_id,
    ...req.body
  };
  updateSales(id, updates)
    .then(updated => res.status(200).json(updated))
    .catch(err =>
      res.status(500).json({
        message:
          "Sorry something went wrong in updating car sale with that id.",
        error_message: err.message
      })
    );
});

// delete sale by id
router.delete("/cars/:car_id/sales/:sale_id", (req, res) => {
  deleteSales(req.params.sale_id)
    .then(() =>
      res.status(200).json({ success: "car sale deletion was successful" })
    )
    .catch(err =>
      res.status(500).json({
        message: "Sorry something went wrong in deleting that car.",
        error_message: err.message
      })
    );
});

module.exports = router;
