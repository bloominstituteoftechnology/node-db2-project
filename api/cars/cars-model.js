const db = require('../../data/db-config');// check config file

const getAll = () => {
  return db('cars');
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first();
};

const create = async car => {
  const [id] = await db('cars').insert(car);
  return getById(id);
};
// const create = (car) => {
//   return db("cars").insert(car)
//     .then(([id]) => getById(id));
// };

const updateById = async (id, car) => {
  await db('cars').where('id', id).update(car);
    return getById(id);
};

const deleteById = id => {
  //DELETE FROM accounts WHERE id='some number';
  return db('cars').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
  updateById,
  deleteById,
}