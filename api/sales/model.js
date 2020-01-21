const db = require("../../data/db_config.js");

module.exports = {
  getSales,
  getSaleByDetail,
  addSales,
  updateSales,
  deleteSales
};

function getSales() {
  return db("sales");
}

function getSaleByDetail(detail) {
  return db("sales")
    .where(detail)
    .first();
}

function addSales(sales) {
  return db("sales")
    .insert(sales, "id")
    .then(newsales => newsales)
    .catch(err => console.log("Something went wrong in adding a sale: ", err));
}

function updateSales(salesId, changes) {
  return db("sales")
    .where("sales.id", salesId)
    .update(changes)
    .then(() => getSaleByDetail({ id: salesId }))
    .catch(err =>
      console.log("Something went wrong in updating a sale: ", err)
    );
}

function deleteSales(salesId) {
  return db("sales")
    .where("sales.id", salesId)
    .del();
}
