const db = require('./dbConfig');



const sell = function(sell){
    const vehicle = db.select('*').from('car-dealer').where({'id': sell})
    const id = vehicle.select('id').from('id')
    return id
}

module.exports = {
    sell
}