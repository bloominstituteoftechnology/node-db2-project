const db = require("../../data/db-config")


const getAll = () => {
  
  return db.select("*")
  .from("cars")

}

const getById = id => {

  return db.select("*")
    .from("accounts")
    .where("id", id)
    .limit(1)

}

const create = async cars => {
  
  const [id] = await db 
    .insert({
      vin: cars.vin,
      make: cars.make,
      model: cars.model,
      mileage: cars.mileage,
      title: cars.title,
      transmission: cars.transmission
    })
    .into("cars")

  const created = await db("cars")
    .where("id", id)
    .first()

  return created
}


module.exports = {
  getAll,
  getById,
  create
}