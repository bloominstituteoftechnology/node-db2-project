const db = require('../../data/dbconfig')

function find(){
    return db('fruits');
}

module.exports = {find}