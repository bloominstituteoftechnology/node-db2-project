const db = require('../../data/db-config');

const getAllSales = () => {
    // DO YOUR MAGIC
    return db('sales')
  }

const getSaleById = (carId) => {
// DO YOUR MAGIC
return db('sales')
    .where('car_id', carId)
    .first()
}

const addNewSale = (sale) => {
// DO YOUR MAGIC
return db("sales")
    .insert(sale, "car_id")
    .then(([carId]) => getSaleById(carId))
}

module.exports = {
    getAllSales,
    getSaleById,
    addNewSale
}
