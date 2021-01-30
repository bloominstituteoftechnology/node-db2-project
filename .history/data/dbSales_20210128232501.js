const db = require('./dbConfig');



const sell = async function(sell){
    return db.select('*').from('car-dealer').where({'id': sell})

}

module.exports = {
    sell
}