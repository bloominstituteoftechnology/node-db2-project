const db = require('./dbConfig');



const sell = function(sell){
    const vehicle = db.select('*').from('car-dealer').where({'id': sell})
    return vehicle
}

module.exports = {
    sell
}