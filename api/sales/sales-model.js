const db = require('../../data/db-config');

const getAllSales = () => {
    // DO YOUR MAGIC
    return db('sales')
  }

const getSaleById = (id) => {
// DO YOUR MAGIC
return db('sales')
    .where('id', id)
    .first()
}

const addNewSale = (sale) => {
// DO YOUR MAGIC
return db("sale")
    .insert(sale, "id")
    .then(([id]) => getSaleById(id))
}

module.exports = {
    getAllSales,
    getSaleById,
    addNewSale
}
