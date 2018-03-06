const knex = require('../database/db.js')

const zoo_db = {
    getAll: function() {
        return knex('zoos')
    },
    getById: function(id) {
        return knex('zoos').where({ id });
    },
    addZoo: function(zoo) {
        return knex.insert(zoo).into('zoos');
    },
    update: function(zoo, id) {
        return knex('zoos').where({ id }).update(zoo); 
    },
    erase: function(id) {
        return knex('zoos').where({ id }).del();
    }
};

module.exports = zoo_db;