const db = require('../../data/db-config');

module.exports = {
    get,
}

async function get(){
    const accounts = await db('cars')
    return accounts;
}