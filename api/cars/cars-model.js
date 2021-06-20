module.exports ={
  getAll,
  getById,
  create,
}

const getAll = () => {
  db.select('*').from('cars');
}

const getById = () => {
  // DO YOUR MAGIC
}

const create = () => {
  // DO YOUR MAGIC
}
