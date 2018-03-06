const knex = require('../../database/db');

const create = (tbl, data) => {
  return knex.insert(data).into(tbl);
};

const get = tbl => {
  return knex(tbl);
};

const getById = (tbl, id) => {
  return knex(tbl)
    .where({ id })
    .first();
};

const update = (tbl, id, zoo) => {
  return knex(tbl)
    .where({ id })
    .update(zoo);
};

const del = (tbl, id) => {
  return knex(tbl)
    .where({ id })
    .del();
};

module.exports = { create, get, getById, update, del };
