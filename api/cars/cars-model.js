const db = require("../../data/db-config.js")
const getAll = () => {
    return db("cars")
}

const getById = (id) => {
    return db("cars")
    .where({id})
    .first()
}

const create = car => {
    return db("cars")
    .insert(car)
    .then(ids => {
        return getById(ids[0]);
    });
}

const updateById = (id, car) => {
    return db("cars")
    .where({id})
    .update(car)
}

const deleteById = id => {
    return db("cars")
    .where({id})
    .del()
}

module.exports = {getAll, getById, create, updateById, deleteById}
