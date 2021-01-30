const db = require('./dbConfig');

module.exports = {
    sell
}

const sell = async function(sell){
    return await db.select('*').from('car-dealer').where({id: sell})

}
