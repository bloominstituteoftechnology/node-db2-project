const db = require('../../data/db-config');

module.exports = {
    get,
    getByVin,
    create
}

async function get(){
    const accounts = await db('accounts')
    return accounts;
}