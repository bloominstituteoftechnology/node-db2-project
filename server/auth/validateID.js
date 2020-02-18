const db = require('../../data/db-config');
module.exports = validateID;

function validateID(req, res, next) {
    console.log('validating id');
    const id = req.params.id;

    db('cars')
    .where({ id: req.params.id })
    .then(car => {
        if (!car[0]) {
            res.status(400).json({ message: "Car does not exist." })
        } else {
            req.car = car;
            next();
        }
    })
}