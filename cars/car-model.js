const db = require('../data/db-config');

async function getCars(){
    return db('cars')
}
module.exports={
    getCars,
}