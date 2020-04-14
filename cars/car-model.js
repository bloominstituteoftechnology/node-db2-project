const db = require('../data/db.config')

function getAll() {
    return db('cars');
}


module.exports = {getAll }