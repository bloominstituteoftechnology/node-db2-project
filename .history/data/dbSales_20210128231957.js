const db = require('./dbConfig');

module.exports = {
    sell
}

const sell = async function(id){
    return await db.select('*').from('car-dealer').where({id: id})

}
